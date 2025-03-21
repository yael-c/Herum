using HerumSiteServer.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IUserRepository, UserRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddFiltering();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowAll", policy =>
  {
    policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
  });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Use(async (context, next) =>
{
  if (context.Request.Path.StartsWithSegments("/api"))
  {
    await next();
    return;
  }

  if (!context.Request.Headers.TryGetValue("session-id", out var sessionId) || string.IsNullOrEmpty(sessionId))
  {
    context.Response.StatusCode = StatusCodes.Status401Unauthorized; // Unauthorized status
    await context.Response.WriteAsync("Unauthorized: Missing session-id" + context.Request.Path);
    return;
  }

  var userRepository = context.RequestServices.GetRequiredService<IUserRepository>();
  var user = userRepository.GetUserBySessionId(sessionId);

  if (user == null)
  {
    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
    await context.Response.WriteAsync("Unauthorized: Invalid session-id");
    return;
  }

  context.Items["User"] = user;

  await next();
});

app.MapGraphQL("/graphql");

app.Run();


public class User
{
  public string Id { get; set; }
  public string PersonalId { get; set; }
  public string? SessionId { get; set; }
  public string MilitaryId { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
  public string Email { get; set; }
  public string PhoneNumber { get; set; }
  public string City { get; set; }
  public string Street { get; set; }
  public string HouseNumber { get; set; }
  public string Password { get; set; }
  public List<LoginData> Logins { get; set; }
  public string Note { get; set; }
  public string ReferringUser { get; set; }
  public string Gender { get; set; }
  public DateTime BirthDate { get; set; }
  public bool IsDeleted { get; set; }
  public string Profession { get; set; }
  public string Rank { get; set; }
  public List<UserAssignment> Assignments { get; set; }
  public List<CollectionSubscription> CollectionActivitiesHistory { get; set; }
  public List<CollectionSubscription> SubscribedCollections { get; set; }
}

public class UserAssignment
{
  public StructPreview StructPreview { get; set; }
  public AssignmentMetadata AssignmentMetadata { get; set; }
}

public class StructPreview
{
  public string Id { get; set; }
}

public class AssignmentMetadata
{
  public string Name { get; set; }
  public string Description { get; set; }
  public string Profession { get; set; }
  public string AssigningUserName { get; set; }
}

public class CollectionSubscription
{
  public CollectionPreview CollectionPreview { get; set; }
  public List<ResourceSubscription> ResourceSubscriptions { get; set; }
  public int SubscriptionStatus { get; set; }
  public int FeedPriority { get; set; }
  public DateTime SubscriptionTime { get; set; }
  public DateTime LastActivityTime { get; set; }
  public int Grade { get; set; }
}

public class CollectionPreview
{
  public string Id { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
  public string ImageUrl { get; set; }
  public List<string> Topics { get; set; }
}

public class ResourceSubscription
{
  public ResourcePreview ResourcePreview { get; set; }
  public int PositionInCollection { get; set; }
  public string SubscriptionStatus { get; set; }
  public DateTime LastActivityTime { get; set; }
  public int Grade { get; set; }
}

public class ResourcePreview
{
  public string Id { get; set; }
  public string Title { get; set; }
  public string Description { get; set; }
  public int Grade { get; set; }
  public string ResourceType { get; set; }
}

public class Collection
{
  public string Id { get; set; }
  public string Name { get; set; }
  public string Description { get; set; }
  public UserPreview CreatingUser { get; set; }
  public List<ResourcePreview> Resources { get; set; }
  public bool IsPublic { get; set; }
  public DateTime LastUpdateTime { get; set; }
  public DateTime CreationTime { get; set; }
  public string CertificateLevel { get; set; }
  public bool IsDeleted { get; set; }
  public List<string> Topics { get; set; }
}

public class Resource
{
  public string Id { get; set; }
  public string Name { get; set; }
  public string Title { get; set; }
  public string Description { get; set; }
  public string Subtitle { get; set; }
  public int Views { get; set; }
  public DateTime LastUpdateTime { get; set; }
  public List<ResourceComment> Comments { get; set; }
  public bool IsDeleted { get; set; }
  public string ResourceType { get; set; }
  public string Link { get; set; }
  public string FileId { get; set; }
  public QuizData Quiz { get; set; }
}

public class ResourceComment
{
  public string PublisherName { get; set; }
  public string Content { get; set; }
  public DateTime PostTime { get; set; }
}

public class QuizData
{
  public int MinGrade { get; set; }
  public string ResourceName { get; set; }
  public List<Question> Questions { get; set; }
  public int AttemptsCount { get; set; }
  public bool IsSubmitted { get; set; }
  public List<QuizUserAnswer> UserAnswers { get; set; }
  public int CurrentQuestion { get; set; }
  public int Grade { get; set; }
}

public class Question
{
  public string Id { get; set; }
  public string Content { get; set; }
  public int Index { get; set; }
  public bool IsSkipped { get; set; }
  public List<Answer> Answers { get; set; }
}

public class Answer
{
  public string Id { get; set; }
  public string Content { get; set; }
  public bool IsCorrect { get; set; }
}

public class QuizUserAnswer
{
  public string QuestionId { get; set; }
  public List<string> AnswerIds { get; set; }
  public bool? Status { get; set; }
}

public class UserPreview
{
  public string Id { get; set; }
  public string FirstName { get; set; }
  public string LastName { get; set; }
}

public class LoginData
{
  public DateTime LoginTime { get; set; }
  public string IPAddress { get; set; }
  public string DeviceInfo { get; set; }
}



public class Query
{
  private readonly IUserRepository _userRepository;
  private readonly IHttpContextAccessor _httpContextAccessor;

  public Query(IUserRepository userRepository, IHttpContextAccessor httpContextAccessor)
  {
    _userRepository = userRepository;
    _httpContextAccessor = httpContextAccessor;
  }

  public User GetUser()
  {
    if (!_httpContextAccessor.HttpContext!.Items.TryGetValue("User", out var userObject) || userObject is not User user)
      throw new Exception("Error getting session user");

    return user;
  }

  public List<User> GetUsers() =>
      _userRepository.GetAllUsers();

  [UseFiltering]
  public IQueryable<Collection> GetCollections() =>
      new List<Collection>
      {
            new Collection
            {
                Id = "C1",
                Name = "אוסף 1",
                Description = "זהו האוסף 1",
                CreatingUser = new UserPreview { Id = "1", FirstName = "יוחנן", LastName = "דו" },
                Resources = new List<ResourcePreview>
                {
                    new ResourcePreview
                    {
                        Id = "R1",
                        Title = "משאב 1",
                        Description = "זהו משאב 1",
                        Grade = 5,
                        ResourceType = "וידאו"
                    },
                    new ResourcePreview
                    {
                        Id = "R2",
                        Title = "משאב 2",
                        Description = "זהו משאב 2",
                        Grade = 4,
                        ResourceType = "מאמר"
                    },
                    new ResourcePreview
                    {
                        Id = "R3",
                        Title = "משאב 3",
                        Description = "זהו משאב 3",
                        Grade = 3,
                        ResourceType = "וידאו"
                    }
                },
                IsPublic = true,
                CreationTime = DateTime.Now,
                LastUpdateTime = DateTime.Now,
                CertificateLevel = "מומחה",
                IsDeleted = false,
                Topics = new List<string> { "מודיעיני", "מערכות" }
            },
            new Collection
            {
                Id = "C2",
                Name = "אוסף 2",
                Description = "זהו האוסף 2",
                CreatingUser = new UserPreview { Id = "2", FirstName = "ג'יין", LastName = "סמית" },
                Resources = new List<ResourcePreview>
                {
                    new ResourcePreview
                    {
                        Id = "R4",
                        Title = "משאב 4",
                        Description = "זהו משאב 4",
                        Grade = 5,
                        ResourceType = "פודקאסט"
                    },
                    new ResourcePreview
                    {
                        Id = "R5",
                        Title = "משאב 5",
                        Description = "זהו משאב 5",
                        Grade = 4,
                        ResourceType = "וידאו"
                    },
                    new ResourcePreview
                    {
                        Id = "R6",
                        Title = "משאב 6",
                        Description = "זהו משאב 6",
                        Grade = 2,
                        ResourceType = "מאמר"
                    }
                },
                IsPublic = false,
                CreationTime = DateTime.Now,
                LastUpdateTime = DateTime.Now,
                CertificateLevel = "מתקדם",
                IsDeleted = false,
                Topics = new List<string> { "מערכות" }
            },
            new Collection
            {
                Id = "C3",
                Name = "אוסף 3",
                Description = "זהו האוסף 3",
                CreatingUser = new UserPreview { Id = "2", FirstName = "יוחנן", LastName = "דו" },
                Resources = new List<ResourcePreview>
                {
                    new ResourcePreview
                    {
                        Id = "R1",
                        Title = "משאב 1",
                        Description = "זהו משאב 1",
                        Grade = 5,
                        ResourceType = "וידאו"
                    }
                },
                IsPublic = true,
                CreationTime = DateTime.Now,
                LastUpdateTime = DateTime.Now,
                CertificateLevel = "מומחה",
                IsDeleted = false,
                Topics = new List<string> { "מערכות" }
            },
            new Collection
            {
                Id = "C4",
                Name = "אוסף 4",
                Description = "זהו האוסף 4",
                CreatingUser = new UserPreview { Id = "2", FirstName = "יוחנן", LastName = "דו" },
                Resources = new List<ResourcePreview>
                {
                    new ResourcePreview
                    {
                        Id = "R1",
                        Title = "משאב 1",
                        Description = "זהו משאב 1",
                        Grade = 5,
                        ResourceType = "וידאו"
                    }
                },
                IsPublic = true,
                CreationTime = DateTime.Now,
                LastUpdateTime = DateTime.Now,
                CertificateLevel = "מומחה",
                IsDeleted = false,
                Topics = new List<string> { "הכשרות" }
            },
            new Collection
            {
                Id = "C5",
                Name = "אוסף 5",
                Description = "זהו האוסף 5",
                CreatingUser = new UserPreview { Id = "2", FirstName = "יוחנן", LastName = "דו" },
                Resources = new List<ResourcePreview>
                {
                    new ResourcePreview
                    {
                        Id = "R1",
                        Title = "משאב 1",
                        Description = "זהו משאב 1",
                        Grade = 5,
                        ResourceType = "וידאו"
                    }
                },
                IsPublic = true,
                CreationTime = DateTime.Now,
                LastUpdateTime = DateTime.Now,
                CertificateLevel = "מומחה",
                IsDeleted = false,
                Topics = new List<string> { "מודיעיני" }
            },
            new Collection
            {
                Id = "C6",
                Name = "אוסף 6",
                Description = "זהו האוסף 6",
                CreatingUser = new UserPreview { Id = "2", FirstName = "יוחנן", LastName = "דו" },
                Resources = new List<ResourcePreview>
                {
                    new ResourcePreview
                    {
                        Id = "R1",
                        Title = "משאב 1",
                        Description = "זהו משאב 1",
                        Grade = 5,
                        ResourceType = "וידאו"
                    }
                },
                IsPublic = true,
                CreationTime = DateTime.Now,
                LastUpdateTime = DateTime.Now,
                CertificateLevel = "מומחה",
                IsDeleted = false,
                Topics = new List<string> { "מערכות" }
            },
            new Collection
            {
                Id = "C7",
                Name = "אוסף 7",
                Description = "זהו האוסף 7",
                CreatingUser = new UserPreview { Id = "2", FirstName = "יוחנן", LastName = "דו" },
                Resources = new List<ResourcePreview>
                {
                    new ResourcePreview
                    {
                        Id = "R1",
                        Title = "משאב 1",
                        Description = "זהו משאב 1",
                        Grade = 5,
                        ResourceType = "וידאו"
                    }
                },
                IsPublic = true,
                CreationTime = DateTime.Now,
                LastUpdateTime = DateTime.Now,
                CertificateLevel = "מומחה",
                IsDeleted = false,
                Topics = new List<string> { "הכשרות" }
            }
      }.AsQueryable();

  public List<Resource> GetResources() =>
      new List<Resource>
      {
            new Resource
            {
                Id = "R1",
                Name = "משאב 1",
                Title = "לימוד C#",
                Description = "מדריך מקיף ל-C#",
                Subtitle = "נושאים מתקדמים",
                Views = 1000,
                LastUpdateTime = DateTime.Now,
                Comments = new List<ResourceComment>
                {
                    new ResourceComment
                    {
                        PublisherName = "ג'יין",
                        Content = "משאב מצוין!",
                        PostTime = DateTime.Now
                    },
                    new ResourceComment
                    {
                        PublisherName = "אלכס",
                        Content = "מאוד מועיל!",
                        PostTime = DateTime.Now
                    },
                    new ResourceComment
                    {
                        PublisherName = "עמי",
                        Content = "למדתי הרבה!",
                        PostTime = DateTime.Now
                    }
                },
                IsDeleted = false,
                ResourceType = "וידאו",
                Link = "https://example.com/resource1",
                FileId = "F1",
                Quiz = new QuizData
                {
                    MinGrade = 60,
                    ResourceName = "לימוד C#",
                    Questions = new List<Question>
                    {
                        new Question
                        {
                            Id = "Q1",
                            Content = "מה זה C#?",
                            Index = 1,
                            IsSkipped = false,
                            Answers = new List<Answer>
                            {
                                new Answer { Id = "A1", Content = "שפת תכנות", IsCorrect = true },
                                new Answer { Id = "A2", Content = "סוג של פרי", IsCorrect = false }
                            }
                        },
                        new Question
                        {
                            Id = "Q2",
                            Content = "מה זה .NET Framework?",
                            Index = 2,
                            IsSkipped = false,
                            Answers = new List<Answer>
                            {
                                new Answer { Id = "A1", Content = "מסגרת תוכנה", IsCorrect = true },
                                new Answer { Id = "A2", Content = "מנוע משחקים", IsCorrect = false }
                            }
                        }
                    },
                    AttemptsCount = 2,
                    IsSubmitted = false,
                    UserAnswers = new List<QuizUserAnswer>(),
                    CurrentQuestion = 0,
                    Grade = 85
                }
            },
            new Resource
            {
                Id = "R2",
                Name = "משאב 2",
                Title = "הבנת ASP.NET",
                Description = "העמקה ב-ASP.NET Core",
                Subtitle = "פיתוח ווב",
                Views = 500,
                LastUpdateTime = DateTime.Now,
                Comments = new List<ResourceComment>
                {
                    new ResourceComment
                    {
                        PublisherName = "יוחנן",
                        Content = "מעניין!",
                        PostTime = DateTime.Now
                    },
                    new ResourceComment
                    {
                        PublisherName = "סופיה",
                        Content = "מאוד מפורט!",
                        PostTime = DateTime.Now
                    }
                },
                IsDeleted = false,
                ResourceType = "מאמר",
                Link = "https://example.com/resource2",
                FileId = "F2",
                Quiz = new QuizData
                {
                    MinGrade = 70,
                    ResourceName = "הבנת ASP.NET",
                    Questions = new List<Question>
                    {
                        new Question
                        {
                            Id = "Q1",
                            Content = "מה זה ASP.NET?",
                            Index = 1,
                            IsSkipped = false,
                            Answers = new List<Answer>
                            {
                                new Answer { Id = "A1", Content = "מסגרת פיתוח ווב", IsCorrect = true },
                                new Answer { Id = "A2", Content = "שפת תכנות", IsCorrect = false }
                            }
                        },
                        new Question
                        {
                            Id = "Q2",
                            Content = "מה היתרון ב-ASP.NET Core?",
                            Index = 2,
                            IsSkipped = false,
                            Answers = new List<Answer>
                            {
                                new Answer { Id = "A1", Content = "ריבוי פלטפורמות", IsCorrect = true },
                                new Answer { Id = "A2", Content = "פשטות הקוד", IsCorrect = false }
                            }
                        }
                    },
                    AttemptsCount = 1,
                    IsSubmitted = false,
                    UserAnswers = new List<QuizUserAnswer>(),
                    CurrentQuestion = 0,
                    Grade = 90
                }
            }
      };
}
