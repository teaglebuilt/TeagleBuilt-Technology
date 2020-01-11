---
path: "/slack-django-ldap-auth"
title: "How can slack and django work together in Oauth?"
description: "integrate slack and django with authentication through active directory & company slack domain"
type: "post"
image: ../images/slack_django.png
tags:
  - Python
  - Django
  - Slack
date: 2018-06-29 07:00:00
---



Many companies may use Active Directory for domain authentication. LDAP, a.k.a “Lightweight Directory Access Protocol”, is a communication language that applications use to communicate with other directory services servers.


&nbsp;



With that said, we will be integrating two external API’s into the application, python_ldap and SlackAPI. Now before we dig in, I want to clarify the use case and why this makes sense. A companies domain controller that is the gateway for user authentication, will also be listed as a a key: value pair in a Slack API response. Typically, your slack workspace will also identify with the name of your company domain. If that is the case, then using Slack as another form of authentication next to Active Directory makes sense, IF you have plans for integrating Slack within areas of your application!


&nbsp;

As far as interacting with Active Directory, fortunately there is already a library that is maintained that simplifies interacting with the python_ldap api.

&nbsp;

So lets set up authentication to the domain controller first. Install django_auth_ldap and configure your settings.py.

&nbsp;

At this step, you need to configure the settings to connect to the server where Active Directory runs, and configure your settings to bind, connect, and state how to search for user’s in the directory.

&nbsp;


```python

AUTH_LDAP_SERVER_URI = config("active_directory_server")
AUTH_LDAP_CONNECTION_OPTIONS = {
ldap.OPT_DEBUG_LEVEL: 1,
ldap.OPT_REFERRALS: 0
}
AUTH_LDAP_BIND_DN = config("DN")
AUTH_LDAP_BIND_PASSWORD = config("PASSWORD")
AUTH_LDAP_USER_SEARCH = LDAPSearch(
"CN=Users,DC=company,DC=test,DC=domain,DC=com", ldap.SCOPE_SUBTREE, "sAMAccountName=%(user)s"
)
AUTH_LDAP_USER_ATTR_MAP = {"first_name": "givenName", "last_name": "sn", "username": "sAMAccountName"}
LDAP_IGNORE_CERT_ERRORS = True
AUTHENTICATION_BACKENDS = (
'django_auth_ldap.backend.LDAPBackend',
)

```

&nbsp;

One thing that is important to mention is that I took out the default Django backend “ModelBackend”, for authenticating users, and replaced it with..

&nbsp;

```python

django_auth_ldap.backend.LDAPBackend

```

&nbsp;

Once your settings are configured, you should be able to authenticate into your app with your credentials using Django’s login method. Seriously, its that simple.


&nbsp;


```python

def login_view(request, *args, **kwargs):
    form = UserLoginForm(request.POST or None)
    try:
        kwargs.get("msg")
        if msg == True:
            messages.add_message(request, messages.SUCCESS, 'Your account has not yet been authenticated with Active Directory '
                                            'Please first register with the domain before using Slack.')
    except:
        pass

    if form.is_valid():
        user = form.login(request)
        if user is not None:
            login(request, user)
            return redirect("/")
    return render(request, "accounts/login.html", {"form": form})

```

For now ignore the try / except block, but pay attention to how I am using a login method off of our django form, if it is valid.


&nbsp;

```python

class UserLoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        user = authenticate(username=username, password=password, backend=LDAPBackend())
        if not user or not user.is_active:
            raise forms.ValidationError("Sorry, that login was invalid. Please try again.")
        return self.cleaned_data

    def login(self, request):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        user = authenticate(username=username, password=password, backend=LDAPBackend())
        return user

```
As you can see, I am setting Django’s authenticate method to use the LDAPBackend.

&nbsp;

Now its time for the fun stuff, interacting with Slacks API which is a fantastic experience due to great documentation and structure.

&nbsp;

> So for authenticating with Slack we will be using OAuth2.0 / Sign in with Slack. If you have not already created you slack app, please do so here. Get your pretty Sign in with Slack button here.

&nbsp;

```

<a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=your_client_id"><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a>

```

<a href="https://slack.com/oauth/authorize?scope=identity.basic&client_id=your_client_id"><img src="https://api.slack.com/img/sign_in_with_slack.png" /></a>

&nbsp;


I chose to set the Slack API credentials in a file that is within my settings directory.

```python

SLACK_CLIENT_ID = config("SLACK_CLIENT_ID")
SLACK_CLIENT_SECRET = config("SLACK_CLIENT_SECRET")
SLACK_AUTHORIZATION_URL = 'https://slack.com/oauth/authorize'
SLACK_OAUTH_ACCESS = 'https://slack.com/api/oauth.access'
SLACK_API_TOKEN = config("SLACK_API_TOKEN")

```

Now it is time to think about our authorization flow. For the most part, Slack will take you through a redirect page that allows the user to authenticate with their Slack credentials against the workspace. So I chose to handle this with a RedirectView / “Class Based View”.

Before digging in to the view, lets set up how we are going to call the API.

&nbsp;


```python

class SlackManager:

    def __init__(self):
        self.base_url = "https://slack.com/api/"

    def authenticate(self):
        data = {
            "client_id": settings.SLACK_CLIENT_ID,
            "scope": "identity.basic identity.team identity.avatar:read:user",
            "redirect_uri": "http://127.0.0.1:8000"
        }
        url = settings.SLACK_OAUTH_ACCESS
        response = requests.get(url, params=data)
        print(response)
        return response

    def get_user_data(self, token):
        endpoint = "users.identity"
        data = {
            "token": token
        }
        user_object = requests.get(self.base_url + endpoint, params=data)
        return user_object.json()

    def get_user_profile(self, user_id, token):
        data = {
            "token": token,
            "user": user_id
        }
        endpoint = "users.profile.get"
        response = requests.get(self.base_url + endpoint, params=data)
        print(response.text)
        return response.json()

```

&nbsp;

If you have read through Slack’s API docs and created your application, then you should understand the parameters used in our requests. The token is the access token obtained from ‘https://slack.com/api/oauth.access' and scope defines permissions amongst the available endpoints.

&nbsp;


Now setting up the authorization flow is your decision, but when you created and registered the slack app for your workspace, there is an option for a redirect uri. This is how slack knows where to deliver the user after they have handled the authentication.

&nbsp;

Below is a RedirectView that handles the logic of the authorization flow.


```python

class OAuthView(RedirectView):
    permanent = True
    text_error = 'Something went wrong with updating your authorization.'

    def dispatch(self, request, *args, **kwargs):
        return super(OAuthView, self).dispatch(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        code = request.GET.get('code')
        if not code:
            return self.auth_request()
        self.validate_state(request.GET.get('state'))
        access_content = self.oauth_access(code)
        if not access_content.status_code == 200:
            return self.error_message()
        api_data = access_content.json()
        if not api_data['ok']:
            return self.error_message(api_data['error'])
        user_obj = gather_slack_info(api_data)
        try:
            user = User.objects.get(username=user_obj["ldap_name"])
            if user is not None:
                profile = UserProfile.objects.get(user=user)    
                profile.slack_token = api_data["access_token"]
                profile.name = user_obj["name"]
                profile.email = user_obj["email"]
                profile.slack_id = user_obj["slack_id"]
                profile.extras = user_obj
                profile.save()
                login(request, user)
                messages.add_message(self.request, messages.SUCCESS, 'Your account has been successfully updated.')                                        
            return self.response()
        except ObjectDoesNotExist:
            return self.ldap_initial_auth(request)

    def auth_request(self):
        state = self.store_state()
        params = urlencode({
            'client_id': settings.SLACK_CLIENT_ID,
            'redirect_uri': self.request.build_absolute_uri(reverse('accounts:Oauth')),
            'scope': 'identity.basic identity.email identity.team identity.avatar',
            'state': state
        })
        return self.response(settings.SLACK_AUTHORIZATION_URL + '?' + params)

    def oauth_access(self, code):
        params = {
            'client_id': settings.SLACK_CLIENT_ID,
            'client_secret': settings.SLACK_CLIENT_SECRET,
            'code': code,
            'redirect_uri': self.request.build_absolute_uri(reverse('accounts:Oauth'))
        }
        return requests.get(settings.SLACK_OAUTH_ACCESS, params=params)

    def validate_state(self, state):
        state_before = self.request.session.pop('state')
        if state_before != state:
            raise StateMismatch('State mismatch upon authorization completion.'
                                ' Try new request.')
        return True

    def store_state(self):
        state = str(uuid.uuid4())[:6]
        self.request.session["state"] = state
        return state

    def response(self, redirect='/'):
        return HttpResponseRedirect(redirect)

    def ldap_initial_auth(self, request):
        msg = True
        return HttpResponseRedirect(reverse("accounts:login", kwargs={"msg": msg}))

```

&nbsp;

Lets start with the get method, which is the primary method that combines all the functionality of the other helper methods together. So slack uses an authentication code that is exchanged for an access token. At https://slack.com/api/authorize this code is generated and swapped for an access code at https://slack.com/api/oauth.access.

&nbsp;

The state parameter should be used to avoid forgery attacks by passing in a value that's unique to the user you're authenticating and checking it when auth completes. We store our state in the user session because of that reason.

&nbsp;

If our API call is successful, then we will extract the information we want and return it in one dictionary.

&nbsp;


```python
def gather_slack_info(user_object):
   slack_user = user_object["user"]
   slack_team = user_object["team"]
   print(slack_user)
   ldap_name = ldapify_name(slack_user["name"])
   context = {
      "slack_id": slack_user["id"],
      "name": slack_user["name"],
      "ldap_name": ldap_name,
      "email": slack_user["email"],
      "team_id": slack_team["id"],
      "team_name": slack_team["name"],
      "domain": slack_team["domain"],
      "avatar": slack_user["image_24"]
    }
    return context

```


&nbsp;


ldapify_name will format the slack’s user name to match the format of username’s in our Active Directory.


```python

def ldapify_name(name):
    x = name.lower()
    y = x.replace(" ", "")
    return y

```

&nbsp;


In the last method of the RedirectView, we are sending the user back to the login screen if they do not exist in the database. User’s do not register in this application. So when you sign in for the first time using your credentials, you will then be added as a user with your active directory username and password.

&nbsp;


I thought it was important that every user initially logs in to the application by LDAP for the first time, then they may use their workspace as an additional form of authentication in the future.

&nbsp;


So I pass a keyword argument over to the login view that tells the django template to display a message to the user to login with Active Directory for their first time.

&nbsp;

That is literally it. Next article will cover integrating the slack user within the application and customizing settings for sending notifications when your given tasks complete to where or whom you choose within the workspace.

&nbsp;


*I posted this article to medium as well*  **[Medium](https://medium.com/@dillan.teagle.va/integrating-slack-with-django-part-one-combining-slack-oauth-with-active-directory-81d3a886cad7)**