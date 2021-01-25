
export class  storageService {
    private static keyName: string = 'commentsTree'

    public static getTree(): string | null {
       return  localStorage.getItem(this.keyName)
    }
    public static saveTree(value: string) {
        localStorage.setItem(this.keyName, value)
    }

}