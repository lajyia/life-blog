export interface IPost{
    _id: string,
    title: string,
    body: string,
    viewed: number,
    likes: number,
    comments: number,
    author: string,
    image: string,
    __v: number
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
    _id: number,
    posts: IPost[]
}