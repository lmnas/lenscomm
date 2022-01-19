'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
 /**
  * Api route to get Customer details of the logged-in user and restrict access to other customers
  * @author arunkumar.ganesan@lmnas.com
  * @param {*} ctx 
  * @returns 
  */   
    async me(ctx) {
        const user = ctx.state.user;
        if (!user) {
            return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }

        const data = await strapi.services.customer.find({user:user.id});
        try {
            ctx.body = data;
        } catch (err) {
            ctx.body = err;
        }
    }
};
