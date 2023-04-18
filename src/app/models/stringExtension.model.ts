
export class StringExtension {
    public reverse(this: string): string {
        return this.split('').reverse().join('');
    }

}


interface String {
    reverse(): string;
}

