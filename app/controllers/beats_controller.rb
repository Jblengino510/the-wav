class BeatsController < ApplicationController

    def index
        render json: Beat.all
    end
    
    def show
        beat = find_beat
        render json: beat
    end

    def create
        beat = Beat.create!(beat_params)
        render json: beat, status: :created
    end

    private

    def find_beat
        Beat.find(params[:id])
    end

    def beat_params
        params.permit(:user_id, :genre_id, :name, :tempo, :price, :is_sold, :date_sold, :audio_data)
    end
end
