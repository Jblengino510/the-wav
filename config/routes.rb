Rails.application.routes.draw do
  
  resources :carts
  resources :likes, only: [:create]
  resources :beats
  resources :genres
  resources :users do
    resources :likes, only: [:index]
  end

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  patch '/editprofile', to: 'users#update'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
