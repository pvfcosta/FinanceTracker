FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FinanceTracker.Application/FinanceTracker.Application.csproj", "FinanceTracker.Application/"]
RUN dotnet restore "FinanceTracker.Application/FinanceTracker.Application.csproj"
COPY . .
WORKDIR "/src/FinanceTracker.Application"
RUN dotnet build "FinanceTracker.Application.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FinanceTracker.Application.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FinanceTracker.Application.dll"]