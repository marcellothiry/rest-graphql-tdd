export default class CategoryRepository {

    /**
     * @return an array with all categories from the database
     */
    static findAll() {
        return []
    }

    /**
     * @return the category if there is an entity with the provided ID, otherwise undefined
     */
    static findById(id) {
        return undefined
    }

    /**
     * Create or update the category provided. Usually, I return the new entity with the ID
     * (automatically generated when creating). If the entity already has an ID, then it's an
     * update.
     * @param category the category to be saved
     * @return the saved category
     */
    static save(category) {
        return undefined
    }

    /**
     * Remove the category provided. If there is no entity for the provided ID, it throws
     * an error.
     * @param id the category's ID to be removed
     * @return the removed category
     */
    static remove(id) {
        return undefined
    }

}
