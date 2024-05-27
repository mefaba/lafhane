package com.lafhane.lafhaneserverjava.services;


import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Queue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Service
public class CountDownTimerService {
    private int timeLeft;
    private Queue<Future<?>> threadQueue;
    private ExecutorService executorService;
    public CountDownTimerService() {
        executorService = Executors.newFixedThreadPool(2);
        threadQueue = new java.util.LinkedList<>();
    }

    public void startTimer(int time) {
        executorService = Executors.newSingleThreadExecutor();
         Future<?> future = executorService.submit(() -> {
            for (int i = time; i >= 0; i--) {
                //System.out.println("Remaining time: " + i + " seconds");
                try {
                    Thread.sleep(1000);
                    this.timeLeft = i;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        threadQueue.add(future);
    }


    public void resetTimer() {
        if (!threadQueue.isEmpty()) {
            Future<?> future = threadQueue.poll();
            future.cancel(true);
        }
    }

    public int getTimeLeft() {
        return timeLeft;
    }

    public void setTimeLeft(int timeLeft) {
        this.timeLeft = timeLeft;
    }


}
