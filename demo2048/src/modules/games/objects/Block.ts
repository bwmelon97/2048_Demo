/* 블록 Logic */
class Block {
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

export default Block;