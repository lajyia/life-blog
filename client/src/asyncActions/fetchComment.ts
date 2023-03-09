import { updateCommentCounterAction } from "../store/commentCounter";
import { PostService } from "../API/PostService";
import { Dispatch } from "redux";


export const fetchComment = (idPost: string | undefined)  =>{
    return async (dispatch: Dispatch) =>{
        const response = await PostService.getPost(idPost);
        dispatch(updateCommentCounterAction(response.comments));
    }
}