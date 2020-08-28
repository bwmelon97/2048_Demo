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
    setSize = (size: number): void => { this.size = size }  // 입력 받은 값을 설정 (pushBlock 할 때 필요)
    doubleSize = (): number => this.size *= 2               // 블록의 사이즈를 2배로 설정
    initBlock = (): void => { this.size = 0 }               // 블록 사이즈를 0으로 초기화
    loadBlock = (): void => { this.size = 2 }               // (초기화 되어 있는) 블록의 사이즈를 2로 설정
}



class BlockLine {

    /* [1단계] 같은 숫자 합치기 */
    static combineSameNumber (isLeftOrDown: boolean, blocks: Block[]): Promise<number> {
        return new Promise<number> ( (resolve, reject) => {
            let scoreToAdd: number = 0;

            /* 반복문 조건 변수 및 함수 */
            let subjectIdx: number = isLeftOrDown ? 0 : SIZE_OF_BOARD - 1;      // 비교 기준이 되는 블럭(합쳐질 때 2배 값을 갖는 블럭)의 인덱스

            const conditionFunc = isLeftOrDown ? 
            (subjectIdx: number): boolean => subjectIdx < SIZE_OF_BOARD - 1 :   // 0 ~ 끝에서 2번째
            (subjectIdx: number): boolean => subjectIdx > 0 ;                   // 끝 ~ 시작에서 2번째

            const getNextIdx = isLeftOrDown ? (idx: number) => idx + 1 : (idx: number) => idx - 1; 


            /* 반복문 내에서 알맞은 objIdx인지 확인하는 메서드 */
            const isValidObjIdx = isLeftOrDown ? 
            (objectIdx: number): boolean => objectIdx < SIZE_OF_BOARD :
            (objectIdx: number): boolean => objectIdx >= 0 ;


            for ( ; conditionFunc(subjectIdx); subjectIdx = getNextIdx(subjectIdx) ) {

                /* Subject Block 사이즈가 0 이면 건너 뛰기 */
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

            resolve(scoreToAdd);
        })
    }

    /* [2단계] 모든 블럭을 방향키 방향으로 몰아 넣기 */
    static pushBlocks (isLeftOrDown: boolean, blocks: Block[]): Promise<void> {
        return new Promise((resolve, reject) => {

            /* 반복문 조건 변수 및 함수 */
            let subjectIdx: number = isLeftOrDown ? 1 : SIZE_OF_BOARD - 2;      // 제자리를 찾고자 하는 블록의 idx

            const conditionFunc = isLeftOrDown ? 
            (subjectIdx: number): boolean => subjectIdx < SIZE_OF_BOARD :       // 앞에서 2번 째 ~ 끝
            (subjectIdx: number): boolean => subjectIdx >= 0 ;                  // 끝에서 2번 째 ~ 0

            const getNextIdx = isLeftOrDown ? (idx: number) => idx + 1 : (idx: number) => idx - 1; 
            const getPrevIdx = isLeftOrDown ? (idx: number) => idx - 1 : (idx: number) => idx + 1;

            const isValidObjIdx = isLeftOrDown ? 
            (objectIdx: number): boolean => objectIdx >= 0 :
            (objectIdx: number): boolean => objectIdx < SIZE_OF_BOARD ;

            
            for ( ; conditionFunc(subjectIdx); subjectIdx = getNextIdx(subjectIdx) ) {

                /* Subject Block 사이즈가 0 이면 건너 뛰기 */
                if ( blocks[subjectIdx].getSize() === 0 ) { continue }

                let tempSubjectIdx: number = subjectIdx;            // subject block 이동 시, 반복문에서 사용하기 위한 임시 인덱스 값 
                let objectIdx: number = getPrevIdx(subjectIdx);     // 비교 대상이 되는 블럭(합쳐질 때 0이 되는 블럭)의 인덱스

                /* objectIdx가 line을 벗어나지 않고, object block이 0이면 subject block을 object 방향으로 이동 */
                while ( isValidObjIdx(objectIdx) && blocks[objectIdx].getSize() === 0 ) {
                    blocks[objectIdx].setSize( blocks[tempSubjectIdx].getSize() );
                    blocks[tempSubjectIdx].initBlock();
                    objectIdx = getPrevIdx(objectIdx);
                    tempSubjectIdx = getPrevIdx(tempSubjectIdx);
                }
            }
        
            resolve();
        })
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
    moveLeft(): Promise<number> {
        return this.handleInputDirectionalKey(true);
    }

    /* 오른쪽 방향키 입력 시 이루어지는 총 과정 */
    moveRight(): Promise<number> {
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


const block1 = new Block(0, 0, 8);
const block2 = new Block(0, 0, 8);
const block3 = new Block(0, 0, 4);
const block4 = new Block(0, 0, 4);
const row1 = new RowLine(1, [block1, block2, block3, block4]);

row1.moveLeft()
.then( () => {
    console.log(row1.getBlocksOfRow().map(block => block.getSize() )) 
})