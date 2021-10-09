#include <bits/stdc++.h>
using namespace std;

bool isValidDate(int d, int m, int y);
void mainDateFunction(string Q);
unsigned long CalcDayNumFromDate(unsigned int y, unsigned int m, unsigned int d)
{
  m = (m + 9) % 12;
  y -= m / 10;
  unsigned long dn = 365 * y + y / 4 - y / 100 + y / 400 + (m * 306 + 5) / 10 + (d - 1);

  return dn;
}
string CalcDayOfWeek(int y, unsigned long m, unsigned long d, string check)
{
  if (check.compare(" invalid ") == 0)
    return "cannot be computed";
  string day[] = {
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday"};

  unsigned long dn = CalcDayNumFromDate(y, m, d);
  return day[dn % 7];
}

bool digitCheck(char ch)
{
  if (48 <= ch && ch <= 57)
    return true;
  else
    return false;
}
int main()
{
  int P;
  cin >> P;
  while (P--)
  {
    string Q;
    fflush(stdin);
    getline(cin, Q);
    mainDateFunction(Q);
  }
  return 0;
}

void mainDateFunction(string Q)
{
  string month = "00", day = "00", year = "0000";
  for (auto it = Q.begin(); it != Q.end() - 2; it++)
  {
    char ch = *it;

    if ((ch == 'm' || ch == 'M') && digitCheck(*(it + 1)) && digitCheck(*(it + 2)))
    {
      string temp;
      temp += *(it + 1);
      temp += *(it + 2);
      month = temp;
    }
    if ((ch == 'd' || ch == 'D') && digitCheck(*(it + 1)) && digitCheck(*(it + 2)))
    {
      string temp;
      temp += *(it + 1);
      temp += *(it + 2);
      day = temp;
    }
    if (it < Q.end() - 4)
    {
      if ((ch == 'y' || ch == 'Y') && digitCheck(*(it + 1)) && digitCheck(*(it + 2)) && digitCheck(*(it + 3)) && digitCheck(*(it + 4)))
      {
        string temp;
        temp += *(it + 1);
        temp += *(it + 2);
        temp += *(it + 3);
        temp += *(it + 4);
        year = temp;
      }
    }
  }
  string ValidDate = isValidDate(stoi(day), stoi(month), stoi(year)) ? " valid " : " invalid ";
  cout << "MM-DD-YYYY " << month << "-" << day << "-" << year << ValidDate << CalcDayOfWeek(stoi(year), stoi(month), stoi(day), ValidDate) << endl;
  cout << "MM-DD-YY " << month << "-" << day << "-" << year.substr(2) << ValidDate << CalcDayOfWeek(stoi(year), stoi(month), stoi(day), ValidDate) << endl;
  cout << "DD-MM-YYYY " << day << "-" << month << "-" << year << ValidDate << CalcDayOfWeek(stoi(year), stoi(month), stoi(day), ValidDate) << endl;
  cout << "DD-MM-YY " << day << "-" << month << "-" << year.substr(2) << ValidDate << CalcDayOfWeek(stoi(year), stoi(month), stoi(day), ValidDate) << endl;
}

const int MAX_VALID_YR = 9999;
const int MIN_VALID_YR = 1800;

bool isLeap(int year)
{
  return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0));
}

bool isValidDate(int d, int m, int y)
{

  if (y > MAX_VALID_YR || y < MIN_VALID_YR)
    return false;
  if (m < 1 || m > 12)
    return false;
  if (d < 1 || d > 31)
    return false;

  if (m == 2)
  {
    if (isLeap(y))
      return (d <= 29);
    else
      return (d <= 28);
  }

  if (m == 4 || m == 6 || m == 9 || m == 11)
    return (d <= 30);

  return true;
}