require 'sinatra'

class PaaS < Sinatra::Application
  get '/' do
    'Home page'
  end
end