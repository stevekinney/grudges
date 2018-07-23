export const ListGrudges = `
query ListGrudges {
    listGrudges {
        items {
            id
            person
            deed
            avenged
        }
    }
}`;

export const CreateGrudge = `
    mutation createGrudge(
        $person: String!
        $deed: String!
        $avenged: Boolean!
    ) {
        createGrudge(input: {
            person: $person,
            deed: $deed,
            avenged: $avenged
        }) {
            id
            person
            deed
            avenged
        }
    }
`;

export const SubscribeToNewGrudge = `
    subscription SubscribeToNewGrudge {
        onCreateGrudge {
            id
            person
            deed
            avenged
        }
    }
`;
