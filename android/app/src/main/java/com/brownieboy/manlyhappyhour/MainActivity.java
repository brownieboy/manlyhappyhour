package com.brownieboy.manlyhappyhour;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import android.content.Context;
import android.app.Activity;
import android.util.Log;
import android.view.View;

public class MainActivity extends ReactActivity {
    class CustomReactActivityDelegate extends ReactActivityDelegate {
        class CustomReactRootView extends ReactRootView {
            public CustomReactRootView(Context context) {
                super(context);
            }
            @Override
            public void onViewAdded(View child) {
                super.onViewAdded(child);
                Log.d("React views started to appear", "Static js code has already run");
            }
        }
        private Activity currentActivity;
        public CustomReactActivityDelegate(Activity activity, String mainComponentName) {
            super(activity, mainComponentName);
            currentActivity = activity;
        }
        protected ReactRootView createRootView() {
            return new CustomReactRootView(currentActivity);
        }
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "manlyhappyhour";
    }
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
         return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      };
    }

}
