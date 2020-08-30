import Block from "./Block";
import { RowLine, ColumnLine } from "./BlockLine";
import { SIZE_OF_BOARD, Direction } from "../types";

/* (Size * Size) 크기의 Board에 대한 로직 */
class Board {
    private blocks: Block[];
    private rows: RowLine[];
    private cols: ColumnLine[];

    constructor (size = SIZE_OF_BOARD) {
        const blocks: Block[] = [];
        const rows: RowLine[] = [];
        const cols: ColumnLine[] = [];

        /* Board의 사이즈 만큼의 Block 생성 후 blocks에 저장 */
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const block = new Block(i, j, 0);
                blocks.push(block);
            }
        }

        /* blocks에서 order에 맞는 line의 블록을 찾아서 Block[] Array를 만들고, 각각을 rows, cols에 저장 */
        for (let idx = 0; idx < size; idx++) {
            const blocksInRow: Block[] = blocks.filter(block => block.getIIdx() === idx);
            const blocksInCol: Block[] = blocks.filter(block => block.getJIdx() === idx);

            rows.push( new RowLine(idx, blocksInRow) );
            cols.push( new ColumnLine(idx, blocksInCol) );
        }

        this.blocks = blocks;
        this.rows = rows;
        this.cols = cols;
    }

    /* board를 초기화 상태를 만드는 메서드.
       모든 블럭을 0으로 만든 다음, randomlyLoadBlock을 2회 실행 */
    async initBoard(): Promise<void> {
        this.blocks.forEach(block =>  block.initBlock());   // Promise 형식의 비동기 문법은 아니지만, 처리속도가 빨라서 인지 뒤의 코드보다 늦게 실행된 적이 없다.
        await this.randomlyLoadBlock(2); 
    }

    /* 프로퍼티 접근 함수 */
    getBlocks = (): Block[] => this.blocks;
    getRows = (): RowLine[] => this.rows;
    getCols = (): ColumnLine[] => this.cols;

    /* Board의 사이즈가 0인 블록 중 임의의 하나에 2를 넣는 메서드 
       count가 있는 경우, 해당 숫자 만큼 해당 기능을 실행 */
    randomlyLoadBlock( count?: number ): Promise<void> {
        return new Promise((resolve, reject) => {
            const emptyBlocks: Block[] = this.blocks.filter(block => block.getSize() === 0);

            const loadBlock = ():void => {
                if ( emptyBlocks.length > 0 ) {
                    const selectedIdx: number = Math.floor(Math.random() * emptyBlocks.length);
                    const seletedBlock: Block = emptyBlocks[selectedIdx];
                    seletedBlock.loadBlock();
                    emptyBlocks.splice(selectedIdx, 1);
                }

                /* 빈 칸이 없는 경우 */
                else {
                    console.error('더 이상 빈 칸이 없습니다.');
                    reject();
                }
            }

            do loadBlock(); while ( count && --count );
            resolve();
        })
    }

    moveLeft = (): Promise<number> => this.handleInputDirectionalKey('LEFT')
    moveRight = (): Promise<number> => this.handleInputDirectionalKey('RIGHT')
    moveUp = (): Promise<number> => this.handleInputDirectionalKey('UP')
    moveDown = (): Promise<number> => this.handleInputDirectionalKey('DOWN')

    /* 방향키 입력 시, rows 또는 cols의 모든 line를 각각 해당 move 함수를 실행 시키고, random Load를 1회 실행 */
    async handleInputDirectionalKey( direction: Direction ): Promise<number> {
        let scoreToAdd: number = 0;
        let movePromise: Promise<number[]>;

        /* 블록 이동 */
        switch (direction) {
            case 'LEFT':
                movePromise = Promise.all(this.rows.map(row => row.moveLeft()))
                break;

            case 'RIGHT':
                movePromise = Promise.all(this.rows.map(row => row.moveRight()));
                break;

            case 'UP':
                movePromise = Promise.all(this.cols.map(col => col.moveUp()));
                break;

            case 'DOWN':
                movePromise = Promise.all(this.cols.map(col => col.moveDown()));
                break;
        }
        await movePromise.then( values => values.forEach( value => scoreToAdd += value ));

        /* 새로운 2 생성 */
        await this.randomlyLoadBlock();
        return scoreToAdd;
    }
}

export default Board;