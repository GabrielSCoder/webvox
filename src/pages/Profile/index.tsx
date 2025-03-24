import { useEffect, useState } from "react";
import ProfileTemplate from "../../templates/ProfileTemplate";
import { useParams, useLocation } from "react-router-dom";
import UsuarioInexistente from "../../templates/UsuarioInexistente";
import LoadingPageTemplate from "../../templates/LoadingPage";
import { AuthProvider } from "../../hooks/useAuth";
import FollowListTemplate from "../../templates/FollowListTemplate";
import useProfileMang from "../../hooks/useProfileMang";
import useDebounce from "../../hooks/useDebounce";
import Postview from "../PostView";
import ProfileEditModal from "../../templates/ProfileEditModal";

export default function ProfilePage() {

    const { username } = useParams()
    const location = useLocation()
    const url = location.pathname.split('/')

    const { getProfileWithUser, getProfileWithoutUser, inx, Profileloading, ProfilePostQTD, ProfileData, postsData, followSituation, followers, following, followersData, followingData,
        handleUnfollow, handleFollow, handleReaction, likesList, setLikesList } = useProfileMang()
    const { getUser, tipo_usuario, authLoading } = AuthProvider()
    const [userData, setUserData] = useState<any>([])
    const [modal, setModal] = useState(false)

    const userrr = async () => {

        const resp = await getUser()
        if (resp?.data) {
            setUserData(resp.data.user)
        }

        await getData(resp?.data.user)
    }

    const getData = async (loggedUser: any) => {
        tipo_usuario == "convidado" ?
            await getProfileWithoutUser(username ?? "") :
            await getProfileWithUser(username ?? "", loggedUser)
    }

    const debounceFollow = (data: any) => {
        handleFollow(data)
    }

    const debounceUnfollow = (data: any) => {
        handleUnfollow(data)
    }

    const debounceReact = (data: any) => {
        const xData = { post_id: data, usuario_id: userData.id, profile_id : ProfileData?.id ?? 0}
        handleReaction(xData)
    }


    const debounceHandlerFollow = useDebounce(debounceFollow, 2000)
    const debounceHandlerUnfollow = useDebounce(debounceUnfollow, 2000)
    const debounceHandlerReact = useDebounce(debounceReact, 500)

    useEffect(() => {

        userrr()

    }, [username])

    if (Profileloading || authLoading) {
        return <LoadingPageTemplate className="h-full w-full" />
    }

    if (url[2] == "following" || url[2] == "followers") {
        return <FollowListTemplate followingList={followingData} followType={url[2]} profileData={ProfileData} followerList={followersData}
            userData={userData} handleFollow={debounceHandlerFollow} handleUnfollow={debounceHandlerUnfollow} />
    }

    if (url[2] == "post" && url[3]) {
        return <Postview profileData={ProfileData} userData={userData} handleReaction={debounceHandlerReact} setPostLikes={setLikesList} postLikes={likesList} />
    }

    if (inx) {
        return <UsuarioInexistente />
    }

    return (
        <>
            <ProfileTemplate userData={userData} profileData={ProfileData} postData={postsData} handleFollow={debounceHandlerFollow}
                handleUnfollow={debounceHandlerUnfollow} ProfilePostQTD={ProfilePostQTD} followSituation={followSituation} followers={followers} following={following}
                handleReaction={debounceHandlerReact} likesList={likesList} setState={setModal} state={modal}
            />
            <ProfileEditModal setState={setModal} state={modal} data={userData} userFunc={userrr}/>
        </>

    )
}