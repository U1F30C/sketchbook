/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

const stack: TreeNode[] = [];

function isAtomic(value: number): boolean {
    return value < 2;
}

function evaluateOperation(op: number, left: number, right: number): number {
    if(op == 2){
        return +(left || right)
    } else if (op == 3){
        return +(left && right)
    }
    throw new Error()
}

function valueToBoolean(value: number): boolean {
    if(value == 0)
        return  false;
    else  if(value == 1)
        return  true;
    throw new Error("");
}

function evaluateTree(root: TreeNode | null): boolean {
    stack.push(root!);
    let result: number = root!.val;

    while(stack.length){
        const current = stack[stack.length - 1]
        if(isAtomic(current.val)) {
            result = current.val;
            stack.pop();

        } else {
            const left = current.left!;
            const right = current.right!
            if(isAtomic(left.val) && isAtomic(right.val)){
                current.val = evaluateOperation(current.val, left.val, right.val) ;
                result = current.val;
                stack.pop();

            } else if(!isAtomic(left.val) ){
                stack.push(left);
            }
            else if(!isAtomic(right.val) ){
                stack.push(right);
            }
        }
    }
    return valueToBoolean(result);
}

