export interface CardContent {
    id: number,
    tag: string, 
    title: string, 
    duration: string
}

export interface ChooseOptioncardObject {
    sectionTitle: string,
    cardContent: CardContent[]
}

export const chooseOptionClientContent : ChooseOptioncardObject = {
    sectionTitle: "Choose your Option",
    cardContent: [
        {
            id: 1,
            tag: "Online",
            title: "VideoCall",
            duration: "40 min"
        },
        {
            id: 2,
            tag: "Online",
            title: "Digital Key",
            duration: "20 min"
        }
    ]
}