function createActor (id, login, avatarURL) {
    const actor = {
        id: id,
        login: login,
        avatar_url: avatarURL
    };
    return actor;
};

module.exports = {
    createActor: createActor
};
