import {EmailSendJob} from "./jobs/emailSend";
export class Queue<T> {

    private arr: T[] = []

    enqueue(item:T): void {
        this.arr.push(item);
    }

    dequeue(): T | undefined {
        return this.arr.shift();
    }

    size(): number {
        return this.arr.length ;
    }

    peek(): T | undefined {
        return this.arr[0];
    }
}

export const emailQueue = new Queue<EmailSendJob>();
