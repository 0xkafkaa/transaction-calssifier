#include<bits/stdc++.h>
using namespace std;

int main(){
    int t;
    cin >> t;
    while(t--){
        int n, k;
        cin >> n >> k;
        vector<long long> nums(n);
        for(int i=0; i<n; i++){
            cin >> nums[i];            
        }
        
        map<long long, long long> mpp;
        for(int i=0; i<n; i++){
            mpp[nums[i]]++;
        }
        vector<long long> freq;
        for(auto it: mpp){
            freq.push_back(it.second);
        }
        sort(freq.begin(), freq.end());
        int p = 0;
        while(k > 0 && p < freq.size()-1){
            if(k >= freq[p]){
                k -= freq[p];
                p++;
            }else break;
        }
        cout << freq.size() - p << endl;
    }
    return 0;
}