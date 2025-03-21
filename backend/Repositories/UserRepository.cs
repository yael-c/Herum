using HerumSiteServer.Controllers;

namespace HerumSiteServer.Repositories
{
  public class UserRepository : IUserRepository
  {
    private static List<User> _users = new List<User>
        {
            new User
            {
                Id = "1",
                PersonalId = "456456456",
                MilitaryId = "98798787",
                SessionId="",
                FirstName = "יוחנן",
                LastName = "דו",
                Email = "john.doe@example.com",
                PhoneNumber = "123456789",
                City = "ניו יורק",
                Street = "רחוב ראשי",
                HouseNumber = "123",
                Password = "סיסמא1",
                Logins = new List<LoginData>(),
                Note = "הערה על המשתמש 1",
                ReferringUser = "ממליץ א'",
                Gender = "זכר",
                BirthDate = new DateTime(1990, 5, 20),
                IsDeleted = false,
                Profession = "מפתח תוכנה",
                Assignments = new List<UserAssignment>
                {
                    new UserAssignment
                    {
                        StructPreview = new StructPreview { Id = "S1" },
                        AssignmentMetadata = new AssignmentMetadata
                        {
                            Name = "משימה 1",
                            Description = "תיאור של משימה 1",
                            Profession = "מפתח",
                            AssigningUserName = "מנהל"
                        }
                    }
                },
                CollectionActivitiesHistory = new List<CollectionSubscription>
                {
                    new CollectionSubscription
                    {
                        CollectionPreview = new CollectionPreview
                          {
                            Id = "C1",
                            Name = "אוסף א'",
                            Description = "תיאור א'",
                            ImageUrl = "url1",
                            Topics = new List<string> { "מודיעיני" }
                        },
                        ResourceSubscriptions = new List<ResourceSubscription>(),
                        SubscriptionStatus = 1,
                        FeedPriority = 2,
                        SubscriptionTime = DateTime.Now,
                        LastActivityTime = DateTime.Now,
                        Grade = 85
                    }
                },
                SubscribedCollections = new List<CollectionSubscription>()
            },
            new User
            {
                Id = "2",
                PersonalId = "123123123",
                SessionId="",
                MilitaryId = "12312312",
                FirstName = "ג'יין",
                LastName = "סמית",
                Email = "jane.smith@example.com",
                PhoneNumber = "987654321",
                City = "לוס אנג'לס",
                Street = "רחוב שני",
                HouseNumber = "456",
                Password = "סיסמא2",
                Logins = new List<LoginData>(),
                Note = "הערה על המשתמש 2",
                ReferringUser = "ממליץ ב'",
                Gender = "נקבה",
                BirthDate = new DateTime(1992, 3, 15),
                IsDeleted = false,
                Profession = "מעצבת גרפית",
                Assignments = new List<UserAssignment>
                {
                    new UserAssignment
                    {
                        StructPreview = new StructPreview { Id = "S2" },
                        AssignmentMetadata = new AssignmentMetadata
                        {
                            Name = "משימה 2",
                            Description = "תיאור של משימה 2",
                            Profession = "מעצבת",
                            AssigningUserName = "מנהל"
                        }
                    }
                },
                CollectionActivitiesHistory = new List<CollectionSubscription>(),
                SubscribedCollections = new List<CollectionSubscription>
                {
                    new CollectionSubscription
                    {
                        CollectionPreview = new CollectionPreview { Id = "C2", Name = "אוסף ב'", Description = "תיאור ב'", ImageUrl = "url2", Topics = new List<string> { "מערכות" } },
                        ResourceSubscriptions = new List<ResourceSubscription>(),
                        SubscriptionStatus = 1,
                        FeedPriority = 1,
                        SubscriptionTime = DateTime.Now,
                        LastActivityTime = DateTime.Now,
                        Grade = 90
                    }
                }
            }
        };

    public IEnumerable<User> GetUsers()
    {
      return _users;
    }

    public void UpdateUser(User user)
    {
      var existingUser = _users.FirstOrDefault(u => u.Id == user.Id);
      if (existingUser != null)
        existingUser.SessionId = user.SessionId;
    }
    public User GetUserBySessionId(string sessionId) // Implementation of the new method
    {
      return _users.FirstOrDefault(u => u.SessionId == sessionId);
    }

    public bool CreateUser(UserCreateModel userCreateModel)
    {
      try
      {
        if (_users.Any(user => user.PersonalId == userCreateModel.PersonalId ||
          user.MilitaryId == userCreateModel.MilitaryId))
          throw new Exception("user already exists with this personal id or military id");

        _users.Add(new User
        {
          FirstName = userCreateModel.FirstName,
          LastName = userCreateModel.LastName,
          PersonalId = userCreateModel.PersonalId,
          MilitaryId = userCreateModel.MilitaryId,
          ReferringUser = userCreateModel.ReferringUser,
          Street = "",
          SubscribedCollections = new List<CollectionSubscription>(),
          Assignments = new List<UserAssignment>(),
          BirthDate = new DateTime(),
          City = "",
          CollectionActivitiesHistory = new List<CollectionSubscription>(),
          Email = "",
          Gender = "",
          HouseNumber = "",
          Id = Guid.NewGuid().ToString(),
          IsDeleted = false,
          Logins = new List<LoginData>(),
          Note = "",
          Password = "",
          PhoneNumber = "",
          Profession = ""
        });

        return true;
      }
      catch (Exception)
      {
        return false;
      }
    }

    public List<User> GetAllUsers()
    {
      return _users.ToList();
    }
  }

  public interface IUserRepository
  {
    IEnumerable<User> GetUsers();
    void UpdateUser(User user);
    User GetUserBySessionId(string sessionId);
    bool CreateUser(UserCreateModel userCreateModel);
    List<User> GetAllUsers();
  }
}
