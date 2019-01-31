interface ICarousel {

    init(): void;
    //跳转到指定的位置
    goIndex(index: number): void;
    //下一页
    goNext(step: number): void;
    //上一页
    goPrev(step: number): void;
}

abstract class BaseCarousel implements ICarousel {

    constructor(dom: any) {

    }

    FrameCount: number;

    init(): void {

    }
    goIndex(index: number): void {

    }
   
    goNext(step: number) {

    }
    goPrev(step: number) {

    }

}