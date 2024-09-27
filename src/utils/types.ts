export type Firework = {
    createdAt: number;
    sparksType: number;
    fireworkType: number;
    fireworkDesign: string;
};

export type Profile = {
    isWinner: boolean;
    receipt: string;
};

export type Item = {
    id: string;
    fireworksData: Record<string, Firework>;
    profile: Profile;
};

export type DynamoDBData = {
    Items: Item[];
};
