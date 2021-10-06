class CartsController < ApplicationController

    def index
        render json: Cart.all
    end

    def create
        cart = Cart.create!(cart_params)
        render json: cart, status: :created
    end

    def destroy
        cart = find_cart
        cart.destroy
        head :no_content
    end

    private

    def find_cart
        Cart.find(params[:id])
    end

    def cart_params
        params.permit(:user_id, :beat_id)
    end
end
