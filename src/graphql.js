export const listGrudges = `
  query listGrudges {
    listGrudges {
      items {
        id
        person
        deed
        avenged
      }
    }
  }
`;

export const createGrudge = `
  mutation createGrudge($id: ID!, $person: String!, $deed: String!, $avenged: Boolean!) {
    createGrudge(input: {
      id: $id,
      person: $person,
      deed: $deed
      avenged: $avenged,
    }) {
      id
      person
      deed
      avenged
    }
  }
`;

export const subscribeToNewGrudges = `
  subscription onCreateGrudge {
    onCreateGrudge {
      id
      person
      deed
      avenged
    }
  }
`;

export const deleteGrudge = `
  mutation deleteGrudge($id: ID!) {
    deleteGrudge(input: {
      id: $id,
    }) {
      id
    }
  }
`;

export const updateGrudge = `
  mutation updateGrudge($id: ID!, $person: String!, $deed: String!, $avenged: Boolean!) {
    updateGrudge(input: {
      id: $id,
      person: $person,
      deed: $deed
      avenged: $avenged,
    }) {
      id
      person
      deed
      avenged
    }
  }
`;

export const subscribeToUpdatedGrudges = `
  subscription onUpdateGrudge {
    onUpdateGrudge {
      id
      person
      deed
      avenged
    }
  }
`;

export const subscribeToDeletedGrudges = `
  subscription onDeleteGrudge {
    onDeleteGrudge {
      id
      person
      deed
      avenged
    }
  }
`;
