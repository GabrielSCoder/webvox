import { useState } from "react"
import { liksList } from "../types/postType"
import { profile } from "../types/profileType"
import useRequest from "./useRequest"
import { compareForm, followForm, relationFollow } from "../types/follow"
import { followAsync, getAllFollowers, getAllFollowersCompare, getTotalizerF, unfollowAsync, VerifyFollowing, VerifyFollowingCompare, VerifyXY } from "../services/follow"
import { getAllPostByUserIdAndReaction, reactToPost } from "../services/post"

export default function useProfileMang() {

    const { handleGetByUsername } = useRequest()
    const [ProfileData, setProfileData] = useState<profile | null>()
    const [ProfilePostQTD, setProfilePostQTD] = useState(-1)
    const [postsData, setPostsData] = useState<any[]>([])
    const [followersData, setFollowersData] = useState([])
    const [followingData, setFollowingData] = useState([])
    const [Profileloading, setProfileLoading] = useState(true)
    const [followSituation, setFollowSituation] = useState(0)
    const [likesList, setLikesList] = useState<liksList[]>([])
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    const [userId, setUserId] = useState(0)
    const [inx, setInx] = useState(false)

    async function getProfileWithUser(username: string, userData: any) {

        setProfileLoading(true)
        const resp = await handleGetByUsername(username ?? "")

        if (resp.success) {
            if (resp.dados != ProfileData) {
                setProfileData(resp.dados)
                setUserId(userData.id)
         
                await verifyUserXYithY({ follower_id: userData.id, following_id: resp.dados.id })
                await getPostsData(resp.dados.id, userData.id)
                await Totalizer({
                    follower_id: -1, profileId: resp.dados.id,
                    following_id: -1
                }, userData.id)
            }
        } else {
            setInx(true)
        }
        setProfileLoading(false)
    }


    async function getProfileWithoutUser(username: string) {

        setProfileLoading(true)
        const resp = await handleGetByUsername(username ?? "")

        if (resp.success) {
            if (resp.dados != ProfileData) {
                setProfileData(resp.dados)
                // await getPostsData(resp.dados?.username)
                await Totalizer(resp.dados.id)
            }
        } else {
            setInx(true)
        }
        setProfileLoading(false)
    }

    async function getPostsData(profile_id: number, user_id: number) {
        // const resp = await handleGetPostsByFilter({ usuario: username ?? "", numeroPagina: 1, tamanhoPagina: 10 })
        const resp2 = await getAllPostByUserIdAndReaction({ userId: user_id, authorId: profile_id })
        if (resp2.data.success) {
            setProfilePostQTD(resp2.data.dados.quantidade_postagens)
            setPostsData(resp2.data.dados.listaPostagens)
            const lkList = resp2.data.dados.listaPostagens.map((value: { id: number, liked: any; total_reactions: any, total_replies: any }) => {
                return { id: value.id, liked: value.liked, total_reactions: value.total_reactions, total_replies: value.total_replies }
            })
            setLikesList(lkList)
        }
    }

    async function verifyUserXYithY(data: followForm) {

        if (data.follower_id != data.following_id) {
            const resp = await VerifyXY({ ...data })
            if (resp) {

                if (resp.data.dados) {
                    relationshipSituation(resp.data.dados)
                }
            }
        }
    }

    function relationshipSituation(data: relationFollow) {
        if (data.seguindo && data.seguido || data.seguindo && !data.seguido) {
            setFollowSituation(1) //Deixar de seguir
        } else if (!data.seguindo && data.seguido) {
            setFollowSituation(2) //seguir de volta
        } else if (!data.seguindo && !data.seguido) {
            setFollowSituation(3) //seguir
        }
    }

    async function getFollowers(id: any) {
        if (id) {
            const resp = await getAllFollowers(id)
            setFollowersData(resp.data)
        }
    }

    async function getFollowing(id: any) {
        if (id) {
            const resp = await VerifyFollowing(id)
            setFollowingData(resp.data)
        }
    }

    async function getCompareFollowers(data: compareForm) {
        if (data) {
            const resp = await getAllFollowersCompare({ user_id: data.user_id, compare_id: data.compare_id })
            setFollowersData(resp.data)
        }
    }

    async function getCompareFollowing(data: compareForm) {
        if (data) {
            const resp = await VerifyFollowingCompare({ user_id: data.user_id, compare_id: data.compare_id })
            setFollowingData(resp.data)
        }
    }

    //Recebe o id para pesquisa dos seguindo e seguidores e verifica se recebe o id do usuario logado e se são iguais, se não, ele retornar a lista do id em comparação com o usuario
    async function Totalizer(data : followForm, loggedUsedId?: number) {

        const resp = await getTotalizerF(data.follower_id == -1  ? data.profileId : data.following_id)

    
        if (resp) {
            setFollowers(resp.data.dados.TotalFollowers)
            setFollowing(resp.data.dados.TotalFollowings)

            if (data.follower_id == -1) {
                await getFollowers(data.profileId)
                await getFollowing(data.profileId)
            } else if (loggedUsedId && typeof data.profileId == "number") {
                await getCompareFollowers({ compare_id: loggedUsedId, user_id: data.profileId })
                await getCompareFollowing({ compare_id: loggedUsedId, user_id: data.profileId })
            } else {
                console.log("3")
            }

        }
    }


    const updateLikes = (data : any, response : any) => {
        setLikesList((prev) =>
            prev.map((post) =>
                post.id === data.post_id
                    ? { ...post, liked: response, total_reactions: response == true ? post.total_reactions + 1 : post.total_reactions - 1 }
                    : post
            )
        );
    }


    const handleFollow = async (data: followForm) => {
        // console.log("follow", data)
        const resp = await followAsync(data)
        if (resp.data.success) {
            await verifyUserXYithY(data)
            await Totalizer(data, userId)
        }
    }

    const handleUnfollow = async (data: followForm) => {
        // console.log("unfollow", data)
        const resp = await unfollowAsync(data)
        if (resp.data.success) {
            await verifyUserXYithY(data)
            await Totalizer(data, userId)
        }
    }

    const handleReaction = async (data: { post_id: number, usuario_id: number, profile_id: number }) => {
        // console.log("react", { post_id: data.post_id, usuario_id: data.usuario_id, profile_id: data.profile_id })
        const resp = await reactToPost(data)
        if (resp.data.success) {
            updateLikes(data, resp.data.dados.liked)
        }
    }


    return {
        getFollowers,
        getFollowing,
        getProfileWithUser,
        getProfileWithoutUser,
        verifyUserXYithY,
        handleFollow,
        handleUnfollow,
        handleReaction,
        setLikesList,
        followersData,
        followingData,
        ProfileData,
        postsData,
        ProfilePostQTD,
        Profileloading,
        inx,
        followSituation,
        likesList,
        followers,
        following
    }
}