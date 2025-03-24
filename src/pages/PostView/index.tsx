import { useParams } from "react-router-dom";
import { getPostbyId, getRepliesByPostId, reactToPost, sendPostAsync } from "../../services/post";
import { useEffect, useState } from "react";
import LoadingPageTemplate from "../../templates/LoadingPage";
import TitleTag from "../../components/TitleTags";
import { IoMdArrowRoundBack } from "react-icons/io";
import { formatPostDate } from "../../utils/dateFormat";
import ReactionsTemplate from "../../templates/ReactionsTemplate";
import ReplyCardTemplate from "../../templates/ReplyCardTemplate";
import FeedList from "../../templates/Feed";
import { createPostForm, liksList, postView } from "../../types/postType";
import { useForm } from "react-hook-form";
import useDebounce from "../../hooks/useDebounce";
import PostNotFound from "../../templates/PostNotFound";

type props = {
    profileData: any
    userData: any
    handleReaction: Function
    setPostLikes: any
    postLikes: any
}

export default function Postview(props: props) {

    const { profileData, userData } = props
    const { id } = useParams()

    const [postData, setPostData] = useState<postView>()
    const [repliesData, setRepliesData] = useState([])
    const { register, watch, reset } = useForm({
        defaultValues: {
            message: ""
        }
    })
    const content = watch("message")
    const [likesList, setLikesList] = useState<liksList[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingReply, setLoadingReply] = useState(false)


    const getPostData = async () => {
        setLoading(true)
        const resp = await getPostbyId({ id: id ? parseInt(id, 10) : 0, profile_id: userData.id })
        if (resp.data.success) {

            setPostData(resp.data.dados)
            await getRepliesData(resp.data.dados)

        }

    }

    const getRepliesData = async (data: any) => {
        const resp = await getRepliesByPostId({
            id: data.id,
            profile_id: userData.id,
            tamanhoPagina: 0,
            numeroPagina: 0
        })
        if (resp) {
            if (resp.data.success) {
                const lkList = resp.data.dados.map((value: { id: number, liked: any; total_reactions: any, total_replies: any }) => {
                    return { id: value.id, liked: value.liked, total_reactions: value.total_reactions, total_replies: value.total_replies }
                })

                setLikesList(lkList)
                setRepliesData(resp.data.dados)
            }
            setLoading(false)
        }
    }

    const handlePost = async (data: any) => {

        setLoadingReply(true)
        const dt: createPostForm = {
            ...data,
            tipo: "feed",
            conteudo: content
        }

        const resp = await sendPostAsync(dt)
        if (resp.data.success) {
            reset()
            // console.log("reply", ({ usuario_id: userData.id, usuario_destino: profileData.id, post_id: resp.data.dados.parent_id }))
            getPostData()
        }

        setLoadingReply(false)
    }

    const updateLikes = (data: any, response: any) => {
        // console.log(data, response)

        setPostData((prev) => (prev ? {
            ...prev, liked: response, total_reactions: response == true ? prev.total_reactions + 1 : prev.total_reactions - 1
        } : prev));

    }

    const updatePostLikes = (data: any, response: any) => {
        setLikesList((prev: any) => prev.map((post: any) =>
            post.id === data.post_id
                ? {
                    ...post, liked: response,
                    total_reactions: response == true ? post.total_reactions + 1 : post.total_reactions - 1
                }
                : post
        ))
    }

    const handleReaction = async (data: { post_id: number, usuario_id: number, profile_id: number }) => {
        // console.log("react", { post_id: data.post_id, usuario_id: data.usuario_id, profile_id: data.profile_id })
        const resp = await reactToPost(data)
        if (resp.data.success) {
            updateLikes(data, resp.data.dados.liked)
        }
        // console.log(resp)
    }

    const handleReactionPosts = async (data: { post_id: number, usuario_id: number, profile_id: number }) => {
        // console.log("react", { post_id: data.post_id, usuario_id: data.usuario_id, profile_id: data.profile_id })
        const resp = await reactToPost(data)
        if (resp.data.success) {
            updatePostLikes(data, resp.data.dados.liked)
        }
        // console.log(resp)
    }

    const debounceReact = (data: any) => {
        const xData = { post_id: data, usuario_id: userData.id, profile_id: profileData.id }
        handleReaction(xData)
    }

    const debounceReactPosts = (data: any) => {
        const xData = { post_id: data, usuario_id: userData.id, profile_id: profileData.id }
        handleReactionPosts(xData)
    }
    
    const debounceHandlerReact = useDebounce(debounceReact, 200)
    const debounceHandlerReactPosts = useDebounce(debounceReactPosts, 200)

    useEffect(() => {

        if (!userData.id || !profileData.id || !postData?.id) return;

    }, [profileData, userData, postData])

    useEffect(() => {
        getPostData()
    }, [id])

    if (loading || postData == undefined) {
        return <LoadingPageTemplate className="w-full h-full" />
    }

    if (profileData.id != postData.usuario_id) {
        return <PostNotFound />
    }

    return (
        <div className="w-full">

            <div className="flex items-center sticky top-0 dark:bg-black bg-white bg-white/50 dark:text-white text-black w-full z-20 p-2 dark:bg-black/50 backdrop-blur-[10px]">
                <div className="flex items-center justify-center p-2 rounded-full hover:bg-gray-500 hover:cursor-pointer" onClick={() => window.history.back()}>
                    <IoMdArrowRoundBack className="text-white" size={20} />
                </div>
                <h2 className="pl-8 text-lg font-semibold">Post</h2>
            </div>
            <div className="px-4 py-2">

                <div className="flex items-center gap-4">
                    <div className="rounded-full h-[40px] w-[40px] bg-purple-500 ">
                        {!profileData?.img_url ? <div className="w-full h-full rounded-full  m-2"></div> : <img src={profileData.img_url} className="h-full w-full rounded-full object-cover"></img>}
                    </div>
                    <div className="flex flex-col">
                        <TitleTag.Sub className="" >{profileData.nome}</TitleTag.Sub>
                        <TitleTag.Normal className="text-gray-600">@{profileData.username}</TitleTag.Normal>
                    </div>
                </div>

                <div>
                    <p className="text-white">{postData?.conteudo}</p>
                </div>

                <h4 className="text-gray-600">{formatPostDate(postData?.data_criacao ?? "")}</h4>
            </div>


            <div className="flex items-center justify-center border-t border-b w-full border-gray-600 hover:cursor-pointer">
                <ReactionsTemplate props={{ likes: postData?.total_reactions ?? 0, isLiked: postData?.liked ?? false, handleReaction: debounceHandlerReact, id: postData?.id ?? 0, locked: false, replies: postData?.total_replies ?? 0 }} />
            </div>

            {loadingReply ? (
                <LoadingPageTemplate className="my-6"/>
            ) : userData.id ? (
                <ReplyCardTemplate profileData={profileData} userData={userData} postData={postData} handleReply={handlePost} register={register} />
            ) : ""
            }

            <FeedList data={repliesData} handleReaction={debounceHandlerReactPosts} likesList={likesList} userId={userData.id ?? 0} />

        </div>

    )
}