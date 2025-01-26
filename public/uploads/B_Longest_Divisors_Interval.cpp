#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin >> t;
    while(t--){
        long long n;
        cin >> n;
        long long ans;
        for(long long i =1; ; i++){
            if(n % i != 0){
                ans = i-1;
                break;
            }
        }
        cout << ans << endl;
    }
    return 0;
}