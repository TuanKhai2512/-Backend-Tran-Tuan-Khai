/**
 * Iterative solution
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Good for small values of n
 */
const sum_to_n_a = (n: number): number => {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Recursive solution
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 *
 * BestCase: Work with small values of n
 * WorstCase: Can cause stack overflow for large values of n
 */
const sum_to_n_b = (n: number): number => {
    if (n === 0) return 0;
    return n + sum_to_n_b(n - 1);
}

/**
 * Gauss's formula
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 * Works instantly regardless of input size
 */
const sum_to_n_c = (n: number): number => {
    return (n * (n + 1)) / 2;
}

