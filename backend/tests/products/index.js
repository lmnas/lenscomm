const request = require('supertest');
const upload = require('../components/upload')

it('should return product basic data and slug', async () => {
    const image = await upload('/public/uploads/jaggery-for-face.jpeg')
    // Product mock data
    const mockProductData = {
        title: 'Unit Test Product',
        description: 'Unit test product description',
        price: 1234.00,
        slug: 'unit-test-product',
        image: image
    };

    /** Creates a new product an push to database */
    const product = await strapi.services.product.create({
        ...mockProductData
    })
    console.log(product)
    await request(strapi.server) // app server is an instance of Class: http.Server
        .get('/products/unit-test-product')
        .set('accept', 'application/json')
        .set('Content-Type', 'application/json')
      //  .expect('Content-Type','/json')
        .expect(200)
        .then(data => {
            expect(data.body).toBeDefined();
            expect(data.body.id).toBe(product.id);
            expect(data.body.title).toBe(product.title);
            expect(data.body.price).toBe(product.price);
        });
})