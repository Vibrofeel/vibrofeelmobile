export class FixLengthArray<I = any> extends Array {
    constructor(private _length: number, fill: I) {
        super();
        for (let i = 0; i < _length; i++) {
            this.push(fill);
        }
    }

    push(...items: I[]) {
        super.push.apply(this, items);
        while (this.length > this._length) {
            this.shift(); //
        }
        return this.length - 1;
    }
    unshift(...items: I[]) {
        super.unshift.apply(this, items);
        while (this.length > this._length) {
            this.pop();
        }
        return this.length - 1;
    }

    setMaxLength(value: number) {
        this._length = value;
    }
}