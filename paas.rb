require 'sinatra'

class PaaS < Sinatra::Application
  get '/' do
    redirect '/index.html'
  end
end