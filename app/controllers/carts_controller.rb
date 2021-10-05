class CartsController < ApplicationController

    def index
        render json: Cart.all
    end

    def create
        cart = Cart.create!(cart_params)
        render json: cart, status: :created
    end

    private

    def cart_params
        params.permit(:user_id, :beat_id)
    end
end
