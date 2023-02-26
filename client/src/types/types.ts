export interface IPost{
    _id: string,
    title: string,
    body: string,
    viewed: number,
    likes: number,
    comments: number,
    author: string,
    image: string,
    __v: number,
    date: string,
    isLiked: boolean
}


export interface IUser {
    avatar: string,
    bio: string,
    likes: number,
    linkName: string,
    nickname: string,
    password: string,
    subscribers: number,
    __v: number,
    _id: string,
    posts: IPost[]
}