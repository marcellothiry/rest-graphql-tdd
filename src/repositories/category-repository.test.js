import {expect} from 'chai'
import CategoryRepository from './category-repository.js'

describe('Category repository test suite', () => {
    it('should return all 3 categories ', () => {
        const categories = CategoryRepository.findAll()
        expect(categories).to.be.a('array')
        expect(categories).to.have.lengthOf(3)
        expect(categories[0].id).to.equal('spaces')
        expect(categories[1].id).to.equal('fitness')
        expect(categories[2].id).to.equal('womenshealth')
    })

    it('should return a specific category (by its id - fitness)', () => {
        const category = CategoryRepository.findById('fitness')
        expect(category).to.not.be.a('array')
        expect(category.title).to.equal('Movement & Fitness')
    })

    it('should not find a non existent category - kids', () => {
        const category = CategoryRepository.findById('kids')
        expect(category).to.equal(undefined)
    })

    it('should add the category kids', () => {
        const kids = {
            id: 'kids',
            title: 'Kids Wear',
            c_node_gradient_upper: 'AB1234',
            c_node_gradient_lower: 'CD4321',
        }
        CategoryRepository.save(kids)
        const category = CategoryRepository.findById('kids')
        expect(category).to.eql(kids)
    })

    it('should update category kids', () => {
        const newCategory = CategoryRepository.findById('kids')
        newCategory.title = 'Kids Wear & Toys'
        const saved = CategoryRepository.save(newCategory)
        const kids = {
            id: 'kids',
            title: 'Kids Wear & Toys',
            c_node_gradient_upper: 'AB1234',
            c_node_gradient_lower: 'CD4321',
        }
        expect(saved).to.eql(kids)
        const category = CategoryRepository.findById('kids')
        expect(category).to.eql(kids)
    })

    it('should remove the category kids', () => {
        const category = CategoryRepository.remove('kids')
        expect(category).to.not.be.a('array')
        expect(category.title).to.equal('Kids Wear & Toys')
        const removed = CategoryRepository.findById('kids')
        expect(removed).to.equal(undefined)
    })

    it('should return an error when trying to remove the non existent category kids', () => {
        expect(() => CategoryRepository.remove('kids')).to.throw('User not found for id "kids"')
    })

})
