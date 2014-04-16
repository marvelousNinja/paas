require 'sinatra'

class PaaS < Sinatra::Application
  get '/' do
    send_file 'public/index.html'
  end
end