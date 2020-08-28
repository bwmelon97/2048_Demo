const SIZE_OF_BOARD = 4 as const;


export class Block {
    private readonly i: number;     // Block의 i 인덱스 (세로 위치) 값. 위에서 부터 0
    private readonly j: number;     // Block의 j 인덱스 (가로 위치) 값. 왼쪽에서 부터 0
    private size: number;           // Block에 할당된 숫자의 크기

    constructor (
        i: number, j: number, size: number
    ) {
        this.i = i;
        this.j = j;
        this.size = size;
    }

    /* 프로퍼티 접근 메서드 */
    getIIdx = (): number => this.i;
    getJIdx = (): number => this.j;
    getSize = (): number => this.size;

    /* Block의 사이즈를 변경하는 메서드 */
    doubleSize = (): number => this.size *= 2   // 블록의 사이즈를 2배로 설정
    initBlock = (): void => { this.size = 0 }   // 블록 사이즈를 0으로 초기화
    loadBlock = (): void => { this.size = 2 }   // (초기화 되어 있는) 블록의 사이즈를 2로 설정
}



class BlockLine {

    /* [1단계] 같은 숫자 합치기 */
    static async combineSameNumber (isLeftOrDown: boolean, blocks: Block[]): Promise<number> {
        let scoreToAdd: number = 0;

        /* 반복문 조건 변수 및 함수 */
        let subjectIdx: number = isLeftOrDown ? 0 : 3;    // 비교 기준이 되는 블럭(합쳐질 때 2배 값을 갖는 블럭)의 인덱스

        const conditionFunc = isLeftOrDown ? 
        (subjectIdx: number): boolean => subjectIdx < SIZE_OF_BOARD - 1 :   // Board 사이즈보다 1 작음
        (subjectIdx: number): boolean => subjectIdx > 0 ;                   // 가장 끝에는 obj block이 없기 때문

        const getNextIdx = isLeftOrDown ? (idx: number) => idx + 1 : (idx: number) => idx - 1; 


        /* 반복문 내에서 알맞은 objIdx인지 확인하는 메서드 */
        const isValidObjIdx = isLeftOrDown ? 
        (objectIdx: number): boolean => objectIdx < SIZE_OF_BOARD :
        (objectIdx: number): boolean => objectIdx >= 0 ;


        for ( subjectIdx; conditionFunc(subjectIdx); subjectIdx = getNextIdx(subjectIdx) ) {

            /* block 사이즈가 0 이면 건너 뛰기 */
            if ( blocks[subjectIdx].getSize() === 0 ) { continue }

            let objectIdx = getNextIdx(subjectIdx);     // 비교 대상이 되는 블럭(합쳐질 때 0이 되는 블럭)의 인덱스

            do {
                /* subject 블록과 object 블록의 사이즈가 같으면, subject는 2배로 설정 / object는 초기화 하고 while 루프를 벗어난다.
                   subjectIdx를 objectIdx로 설정해서 다음 for loop에서 subjectIdx는 현재 objectIdx의 다음 값을 갖도록 한다. */
                if ( blocks[subjectIdx].getSize() === blocks[objectIdx].getSize() ) {
                    scoreToAdd += blocks[subjectIdx].doubleSize();
                    blocks[objectIdx].initBlock();
                    subjectIdx = objectIdx;
                    break;
                }
            
                /* object 블록이 0인 경우, 다음 index의 블록을 object로 설정해서 비교한다. */
                else if ( blocks[objectIdx].getSize() === 0 ) {
                    objectIdx = getNextIdx(objectIdx)
                }

                /* object 블록이 0이 아닌 subject와 다른 값이라면, 해당 subject 블록의 조사는 종료한다. (while루프 break) */
                else { break; }

            } while( isValidObjIdx(objectIdx) )

        }

        return scoreToAdd;
    }

    /* [2단계] 모든 블럭을 방향키 방향으로 몰아 넣기 */
    static async pushBlocks (isLeftOrDown: boolean, blocks: Block[]): Promise<boolean> {
        let isDone: boolean = false;

        return isDone;
    }

}


export class RowLine extends BlockLine {
    private readonly order: number;
    private blocks: Block [];

    constructor (order: number, blocks: Block []) {
        super();
        this.order = order;
        this.blocks = blocks;
    }

    /* 프로퍼티 접근 메서드 */
    getOrderOfRow = (): number => this.order
    getBlocksOfRow = (): Block[] => this.blocks


    /* 왼쪽 방향키 입력 시 이루어지는 총 과정 */
    async moveLeft(): Promise<number> {
        return this.handleInputDirectionalKey(true);
    }

    /* 오른쪽 방향키 입력 시 이루어지는 총 과정 */
    async moveRight(): Promise<number> {
        return this.handleInputDirectionalKey(false);
    }

    async handleInputDirectionalKey(isLeftOrDown: boolean): Promise<number> {
        let scoreToAdd: number = 0;

        try {
            scoreToAdd = await BlockLine.combineSameNumber(isLeftOrDown, this.blocks);
            await BlockLine.pushBlocks(isLeftOrDown, this.blocks);    
        } catch (error) {
            console.error('An error occurs on [handleInputDirectionalKey()]')
        }

        return scoreToAdd;
    }

}


const block1 = new Block(0, 0, 4);
const block2 = new Block(0, 0, 0);
const block3 = new Block(0, 0, 4);
const block4 = new Block(0, 0, 4);
const row1 = new RowLine(1, [block1, block2, block3, block4]);

row1.moveLeft();

console.log(row1.getBlocksOfRow().map(block => block.getSize() ));