require 'Bamboozled'
require 'json'
require 'rest-client'

hudlkey = File.read('apikey')

# Create the client:
client = Bamboozled.client(subdomain: 'hudl', api_key: hudlkey)

users = [];

bambooUsers = client.employee.all()
bambooUsers.each do |user|
  tmpUser = {}
  tmpUser["email"] = user['workEmail']
  tmpUser["firstName"] = user['firstName']
  tmpUser["lastName"] = user['lastName']
  users.push(tmpUser)
end

users.each do |user|
  puts JSON.generate(user)

  RestClient.post "http://localhost:4000/users", user.to_json, :content_type => :json, :accept => :json

end
