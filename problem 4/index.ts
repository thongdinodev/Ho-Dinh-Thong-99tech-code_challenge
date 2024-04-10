// 1) For loop, time complexity: O(n)
function sum_to_n_a(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum = sum + i;
    }
    return sum;
}

// 2) Math formula, time complexity: O(1)
function sum_to_n_b(n: number): number {
	return n * (n + 1) / 2;
}

// 3) Recursion, time complexity: O(n)
function sum_to_n_c(n: number): number {
	// your code here
    if (n !== 0) {
        return n = n + sum_to_n_c(n - 1)
    } else {
        return n
    }
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(20));
console.log(sum_to_n_c(6));

