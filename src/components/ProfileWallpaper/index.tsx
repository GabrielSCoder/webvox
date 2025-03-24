export default function ProfileWallpaper({backgroundUrl} : {backgroundUrl : string}) {
    
    return (
        <>
            <div className="w-full">
                {backgroundUrl ? (
                    <img src={backgroundUrl} className="object-cover h-[200px] w-full z-0 aspect-3/2" />
                ): (
                    <div className="bg-white object-cover h-[200px] w-full z-0 aspect-3/2" />
                )}
            </div>
        </>
    )
}