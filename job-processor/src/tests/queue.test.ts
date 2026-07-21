import { describe, it, expect } from "vitest";
import { Queue } from "../queue";

describe("Queue", () => {
  it("should increase size after enqueue", () => {
    const queue = new Queue<string>();
    queue.enqueue("test");
    expect(queue.size()).toBe(1);
  });
  it("dequeue should returns first job", () => {
    const queue = new Queue<string>();
    queue.enqueue("first");
    queue.enqueue("second");
    expect(queue.dequeue()).toBe("first");
  });
  it("dequeue returns undefined when empty", () => {
    const queue = new Queue<string>();
    expect(queue.dequeue()).toBeUndefined();
  });
  it("size should returns correct count after multiple enqueues", () => {
    const queue = new Queue<string>();
    queue.enqueue("first");
    queue.enqueue("second");
    queue.enqueue("thired");
    expect(queue.size()).toBe(3);
  });
  it("peek returns first job without removing it", () => {
    const queue = new Queue<string>();
    queue.enqueue("first");
    queue.enqueue("second");
    expect(queue.peek()).toBe("first");
    expect(queue.size()).toBe(2);
  });
});
