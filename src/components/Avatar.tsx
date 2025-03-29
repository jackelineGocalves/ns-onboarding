export default function Avatar({ avatarClass, icon} : {avatarClass?: string, icon: React.ReactElement} ) {
    return (

        <div className={`avatar ${avatarClass}`}>
            {icon}
        </div>

    )
}