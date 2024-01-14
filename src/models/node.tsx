interface Node<T> {
    data: T,
    dependencies: Node<T>[] ,
    visited: boolean
}

export default Node;