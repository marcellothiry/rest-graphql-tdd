import {categoryDB} from '../.database/category-db.js'

export default class CategoryRepository {

    /**
     * @return an array with all categories from the database
     */
    static findAll() {
        return categoryDB
    }

    /**
     * @return the category if there is an entity with the provided ID, otherwise undefined
     */
    static findById(id) {
        return categoryDB.find(c => c.id === id)
    }

    /**
     * Create or update the category provided. Usually, I return the new entity with the ID
     * (automatically generated when creating). In this case, if the entity already has an ID,
     * then it's an update.
     * @param category the category to be saved
     * @return the saved category
     */
    static save(category) {
        const index = categoryDB.findIndex(c => c.id === category.id)
        if (index >= 0) {
            categoryDB[index] = category
        } else {
            categoryDB.push(category)
        }
        return category
    }

    /**
     * Remove the category provided. If there is no entity for the provided ID, it throws
     * an error.
     * @param id the category's ID to be removed
     * @return the removed category
     */
    static remove(id) {
        const index = categoryDB.findIndex(c => c.id === id)
        if (index < 0) throw new Error(`User not found for id "${id}"`)
        const removed = categoryDB[index]
        categoryDB.splice(index, 1)
        return removed
    }

}
