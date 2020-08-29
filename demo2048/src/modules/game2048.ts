const SIZE_OF_BOARD = 4 as const;

enum Direction {
    /* Row Direction */
    LEFT = 'LEFT', RIGHT = 'RIGHT',
    /* Column Direction */
    UP = 'UP', DOWN = 'DOWN'
}

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

    protected readonly order: number;
    protected blocks: Block [];

    constructor (order: number, blocks: Block []) {
        this.order = order;
        this.blocks = blocks;
    }

    /* Static Methods */

    /* [1단계] 같은 숫자 합치기 */
    static combineSameNumber (isLeftOrUp: boolean, blocks: Block[]): Promise<number> {
        return new Promise<number> ( (resolve, reject) => {
            let scoreToAdd: number = 0;

            /* 반복문 조건 변수 및 함수 */
            let subjectIdx: number = isLeftOrUp ? 0 : SIZE_OF_BOARD - 1;        // 비교 기준이 되는 블럭(합쳐질 때 2배 값을 갖는 블럭)의 인덱스

            const conditionFunc = isLeftOrUp ? 
            (subjectIdx: number): boolean => subjectIdx < SIZE_OF_BOARD - 1 :   // 0 ~ 끝에서 2번째
            (subjectIdx: number): boolean => subjectIdx > 0 ;                   // 끝 ~ 시작에서 2번째

            const getNextIdx = isLeftOrUp ? (idx: number) => idx + 1 : (idx: number) => idx - 1; 


            /* 반복문 내에서 알맞은 objIdx인지 확인하는 메서드 */
            const isValidObjIdx = isLeftOrUp ? 
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
    static pushBlocks (isLeftOrUp: boolean, blocks: Block[]): Promise<void> {
        return new Promise((resolve, reject) => {

            /* 반복문 조건 변수 및 함수 */
            let subjectIdx: number = isLeftOrUp ? 1 : SIZE_OF_BOARD - 2;      // 제자리를 찾고자 하는 블록의 idx

            const conditionFunc = isLeftOrUp ? 
            (subjectIdx: number): boolean => subjectIdx < SIZE_OF_BOARD :       // 앞에서 2번 째 ~ 끝
            (subjectIdx: number): boolean => subjectIdx >= 0 ;                  // 끝에서 2번 째 ~ 0

            const getNextIdx = isLeftOrUp ? (idx: number) => idx + 1 : (idx: number) => idx - 1; 
            const getPrevIdx = isLeftOrUp ? (idx: number) => idx - 1 : (idx: number) => idx + 1;

            const isValidObjIdx = isLeftOrUp ? 
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


    /* 프로퍼티 접근 메서드 */
    getOrderOfRow = (): number => this.order
    getBlocksOfRow = (): Block[] => this.blocks


    /* 방향 키 입력 시, 줄에서 일어나는 일련의 과정을 실행하는 메서드 */
    async handleInputDirectionalKey(direction: Direction): Promise<number> {
        let scoreToAdd: number = 0;
        let isLeftOrUp: boolean = true;

        switch(direction) {
            case Direction.RIGHT: case Direction.DOWN: 
            isLeftOrUp = false; break; 
        }

        try {
            scoreToAdd = await BlockLine.combineSameNumber(isLeftOrUp, this.blocks);
            await BlockLine.pushBlocks(isLeftOrUp, this.blocks); 
        } catch (error) {
            console.error('An error occurs on [handleInputDirectionalKey()]')
        }

        return scoreToAdd;
    }

}


export class RowLine extends BlockLine {

    constructor (order: number, blocks: Block []) {
        super(order, blocks);
    }

    /* 왼쪽 방향키 입력 시 이루어지는 총 과정 */
    moveLeft = (): Promise<number> => this.handleInputDirectionalKey(Direction.LEFT)

    /* 오른쪽 방향키 입력 시 이루어지는 총 과정 */
    moveRight = (): Promise<number> => this.handleInputDirectionalKey(Direction.RIGHT)
}

export class ColumnLine extends BlockLine {

    constructor (order: number, blocks: Block []) {
        super(order, blocks);
    }

    /* 왼쪽 방향키 입력 시 이루어지는 총 과정 */
    moveUp = (): Promise<number> => this.handleInputDirectionalKey(Direction.UP)

    /* 오른쪽 방향키 입력 시 이루어지는 총 과정 */
    moveDown = (): Promise<number> => this.handleInputDirectionalKey(Direction.DOWN)
}


/* Test Code */

// const block1 = new Block(0, 0, 2);
// const block2 = new Block(0, 0, 0);
// const block3 = new Block(0, 0, 2);
// const block4 = new Block(0, 0, 4);

// const block5 = new Block(0, 0, 8);
// const block6 = new Block(0, 0, 8);
// const block7 = new Block(0, 0, 4);
// const block8 = new Block(0, 0, 4);

// const row1 = new RowLine(1, [block1, block2, block3, block4]);

// row1.moveLeft()
// .then( () => {
//     console.log(row1.getBlocksOfRow().map(block => block.getSize() )) 
// })

// const col1 = new ColumnLine(1, [block5, block6, block7, block8]);

// col1.moveDown()
// .then( () => {
//     console.log(col1.getBlocksOfRow().map(block => block.getSize() )) 
// })

/*******************************/


export class Board {
    private blocks: Block[];
    private rows: RowLine[];
    private cols: ColumnLine[];

    constructor (size = SIZE_OF_BOARD) {
        const blocks: Block[] = [];
        const rows: RowLine[] = [];
        const cols: ColumnLine[] = [];

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const block = new Block(i, j, 0);
                blocks.push(block);
            }
        }

        for (let idx = 0; idx < size; idx++) {
            const blocksInRow: Block[] = blocks.filter(block => block.getIIdx() === idx);
            const blocksInCol: Block[] = blocks.filter(block => block.getJIdx() === idx);

            rows.push( new RowLine(idx, blocksInRow) );
            cols.push( new ColumnLine(idx, blocksInCol) );
        }

        this.blocks = blocks;
        this.rows = rows;
        this.cols = cols;

        this.randomlyLoadBlock();
        this.randomlyLoadBlock();
    }

    /* 프로퍼티 접근 함수 */
    getBlocks = (): Block[] => this.blocks;
    getRows = (): RowLine[] => this.rows;
    getCols = (): ColumnLine[] => this.cols;


    /* Board의 사이즈가 0인 블록 중 임의의 하나에 2를 넣는 메서드 */
    randomlyLoadBlock(): Promise<void> {
        return new Promise((resolve, reject) => {
            const emptyBlocks: Block[] = this.blocks.filter(block => block.getSize() === 0);

            if ( emptyBlocks.length > 0 ) {
                const ramdomIdx: number = Math.floor(Math.random() * emptyBlocks.length);
                const seletedBlock: Block = emptyBlocks[ramdomIdx];
                seletedBlock.loadBlock();
                resolve();
            }

            /* 빈 칸이 없는 경우 */
            else {
                console.log('더 이상 빈 칸이 없습니다.');
                resolve();
            }
        })
    }

    moveLeft = (): Promise<number> => this.handleInputDirectionalKey(Direction.LEFT)
    moveRight = (): Promise<number> => this.handleInputDirectionalKey(Direction.RIGHT)
    moveUp = (): Promise<number> => this.handleInputDirectionalKey(Direction.UP)
    moveDown = (): Promise<number> => this.handleInputDirectionalKey(Direction.DOWN)

    async handleInputDirectionalKey( direction: Direction ): Promise<number> {
        let scoreToAdd: number = 0;
        let movePromise: Promise<number[]>;

        /* 블록 이동 */
        switch (direction) {
            case Direction.LEFT:
                movePromise = Promise.all(this.rows.map(row => row.moveLeft()))
                break;

            case Direction.RIGHT:
                movePromise = Promise.all(this.rows.map(row => row.moveRight()));
                break;

            case Direction.UP:
                movePromise = Promise.all(this.cols.map(col => col.moveUp()));
                break;

            case Direction.DOWN:
                movePromise = Promise.all(this.cols.map(col => col.moveDown()));
                break;
        }
        await movePromise.then( values => values.forEach( value => scoreToAdd += value ));

        /* 새로운 2 생성 */
        await this.randomlyLoadBlock();
        return scoreToAdd;
    }
}


// const board = new Board();

// console.log( board.getBlocks().map(block => {
//     return `${block.getSize()}`
// }) );

// board.moveLeft().then(() => {
//     console.log( board.getBlocks().map(block => {
//         return `${block.getSize()}`
//     }) );

//     board.moveLeft().then(() => {
//         console.log( board.getBlocks().map(block => {
//             return `${block.getSize()}`
//         }) );

//         board.moveLeft().then(() => {
//             console.log( board.getBlocks().map(block => {
//                 return `${block.getSize()}`
//             }) );

//             board.moveRight().then(() => {
//                 console.log( board.getBlocks().map(block => {
//                     return `${block.getSize()}`
//                 }) );

//                 board.moveUp().then(() => {
//                     console.log( board.getBlocks().map(block => {
//                         return `${block.getSize()}`
//                     }) );

//                     board.moveDown().then(() => {
//                         console.log( board.getBlocks().map(block => {
//                             return `${block.getSize()}`
//                         }) );
//                     })
//                 })
//             })
//         })
//     })
// })

// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();
// board.randomlyLoadBlock();

// board.randomlyLoadBlock();

// console.log( board.getBlocks().map(block => {
//     // return `${block.getIIdx()} ${block.getJIdx()} ${block.getSize()}`
//     return `${block.getSize()}`
// }) );

// console.log( board.getRows().map(row => {
//     return `${row.getOrderOfRow()} ${row.getBlocksOfRow().map(block => block.getSize())}`
// }) )

// console.log( board.getCols().map(col => {
//     return `${col.getOrderOfRow()} ${col.getBlocksOfRow().map(block => block.getSize())}`
// }) )