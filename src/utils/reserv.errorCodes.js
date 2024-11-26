export const RESERVER_ERROR_CODE = {
    RESERVER_CREATION_FAILED: 1001,
    RESERVER_FETCH_FAILED: 1002,
    RESERVER_NOT_FOUND: 1003,
    RESERVER_SEARCH_FAILED: 1004,
    BOOK_ALREADY_ASSIGNED: 1005,
    BOOK_ASSIGN_FAILED: 1006,
    RESERVER_FETCH_BY_ID_FAILED: 1008,
    NO_RESERVERS_FOUND: 1009,
    BOOK_DELETE_FAILED: 1010,
    RESERVER_DELETE_FAILED: 1012,
}

export const createAuthorController = async (req, res, next) => {
    try {
        const author = req.body;
        const existAuthor= await findAuthorByNameAndLastName(author.name, author.lastName);

        if(existAuthor) throw createError(400, 'El autor ya existe');

        const authorCreated = await saveAuthor(author);
        res.status(201).json({ message: 'author created', data: authorCreated });
    } catch (e) {
        switch(e.code)
        {
            case AuthorErrorCodes.AUTHOR_NOT_FOUND:next(createError(404, 'El autor no existe'));
                break;
            case AuthorErrorCodes.AUTHOR_SEARCH_FAILED:next(createError(500, 'Error al buscar el autor'));
                break;
            default:
                next(e);
        }
    }
}