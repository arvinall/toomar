/**
 * @returns merge of `A` and `B`
 * 
 * @see Thanks to {@link https://stackoverflow.com/posts/65814101/revisions Michael P. Scott}
 * 
 * @category Internals
 */
export type Merge <A, B> = {
  [K in keyof A | keyof B]: 
    K extends keyof A & keyof B
      ? A[K] | B[K]
      : K extends keyof B
        ? B[K]
        : K extends keyof A
          ? A[K]
          : never
}
