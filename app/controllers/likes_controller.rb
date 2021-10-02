class LikesController < ApplicationController

    def index
        render json: Like.all
    end

    def create
        like = Like.find_by(user_id: params[:user_id], beat_id: params[:beat_id])
        if like
            like.destroy
            head :no_content
        else
            like = Like.create!(like_params)
            render json: like, status: :created
        end
    end

    private

    def like_params
        params.permit(:user_id, :beat_id)
    end
end
