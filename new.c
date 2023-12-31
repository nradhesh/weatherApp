#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int key;
} element;

element *stack;
int capacity = 1;
int top = -1;

void createStack() {
    stack = (element *)malloc(capacity * sizeof(element));
}

void push(int value) {
    if (top == capacity - 1) {
        capacity *= 2;  // Double the capacity when the stack is full
        stack = (element *)realloc(stack, capacity * sizeof(element));
    }
    top++;
    stack[top].key = value;
}

int pop() {
    if (top == -1) {
        printf("Stack is empty\n");
        return -1;  // or any other appropriate value for an empty stack
    } else {
        int value = stack[top].key;
        top--;
        return value;
    }
}

void displayStack() {
    if (top == -1) {
        printf("Stack is empty\n");
    } else {
        printf("Stack elements: ");
        for (int i = 0; i <= top; i++) {
            printf("%d ", stack[i].key);
        }
        printf("\n");
    }
}

int main() {
    createStack();

    push(1);
    push(2);
    push(3);

    displayStack();

    int poppedValue = pop();
    printf("Popped element: %d\n", poppedValue);

    displayStack();

    free(stack);  // Don't forget to free the allocated memory

    return 0;
}
