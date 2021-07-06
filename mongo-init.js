db.createUser(
    {
        user: "puzzle",
        pwd: "puzzlePass",
        roles: [
            {
                role: "readWrite",
                db: "todoapp"
            }
        ]
    }
);